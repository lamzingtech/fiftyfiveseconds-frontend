import os
import psycopg2
import requests
import json
from dotenv import load_dotenv
from spot_functions import start_instance, stop_instance

# Load environment variables
load_dotenv()
ov_port = os.getenv("OV_PORT")
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")


# Database connection setup
def get_db_connection():
    return psycopg2.connect(
        database="55-secs",
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASS"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT")
    )

def fetch_one(cursor, query, params=None):
    cursor.execute(query, params or ())
    return cursor.fetchone()

def fetch_all(cursor, query, params=None):
    cursor.execute(query, params or ())
    return cursor.fetchall()

def execute_query(cursor, query, params=None):
    cursor.execute(query, params or ())

def update_instance_details(conn, details):
    with conn.cursor() as cursor:
        execute_query(cursor, """
        UPDATE instance_details
        SET
            instance_status = %s,
            instance_ip = %s,
            request_id = %s,
            instance_id = %s,
            in_use = %s,
            cron_count = %s
        WHERE key = 'instance_1'
        """, details)
        conn.commit()

with get_db_connection() as conn:
    with conn.cursor() as cursor:

        # Check if there are tasks to process
        tasks = fetch_all(cursor, """
        SELECT uuid, task_id, email, in_s3_uri, out_s3_uri, task_status, skip, times_run
        FROM task_list
        WHERE task_status = FALSE AND skip = FALSE
        """)

        if tasks:
            instance_details = fetch_one(cursor, "SELECT * FROM instance_details WHERE key = 'instance_1'")

            # Ensure instance_details is not None before accessing keys
            try:
                if instance_details and not instance_details['instance_status']:
                    response = start_instance()
                    update_instance_details(conn, (
                        True,
                        response['instance_ip'],
                        response['request_id'],
                        response['instance_id'],
                        False,
                        0
                    ))
                else:
                    print("instance_details table not found")
            except Exception as e:
                print(f"Error starting instance: {e}")

            # Add a safeguard for infinite loops
            max_iterations = os.getenv("MAX_ITERATIONS")
            iteration_count = 0

            while tasks:
                if iteration_count >= max_iterations:
                    print("Maximum iterations reached. Exiting loop to prevent infinite processing.")
                    break

                execute_query(cursor, "UPDATE instance_details SET in_use = TRUE WHERE key = 'instance_1'")
                conn.commit()

                for task in tasks:
                    uuid, task_id, email, in_s3_uri, out_s3_uri, task_status, skip, times_run = task

                    # Use a configurable parameter for times_run threshold
                    max_times_run = int(os.getenv("MAX_TIMES_RUN", 5))
                    if times_run > max_times_run:
                        execute_query(cursor, "UPDATE task_list SET skip = TRUE WHERE uuid = %s", (uuid,))
                        conn.commit()
                        continue

                    instance_ip = fetch_one(cursor, "SELECT instance_ip FROM instance_details WHERE key = 'instance_1'")[0]

                    response = requests.post(
                        f"http://{instance_ip}:{ov_port}/clone_voice/",
                        headers={
                            'accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data={
                            's3_uri': in_s3_uri,
                            'prompt': 'Generate a summary of the audio in less than 200 words',
                            'text_string': '',
                            'accent': os.getenv("VOICE_ACCENT"),
                            'speed': 1,
                            'filename': 'Generated_Voice'
                        }
                    )

                    if response.status_code == 200:
                        s3_generated_voice = response.json().get('s3_generated_voice')
                        execute_query(cursor, """
                        UPDATE task_list
                        SET task_status = TRUE, out_s3_uri = %s
                        WHERE uuid = %s
                        """, (s3_generated_voice, uuid))
                    elif response.status_code == 500:
                        execute_query(cursor, """
                        UPDATE task_list
                        SET times_run = times_run + 1
                        WHERE uuid = %s
                        """, (uuid,))

                        execute_query(cursor, """
                        INSERT INTO debug_logs (uuid, run_count, debug_log)
                        VALUES (%s, %s, %s)
                        """, (uuid, times_run + 1, response.text))

                    conn.commit()
                
                # Refresh tasks
                tasks = fetch_all(cursor, """
                SELECT uuid, task_id, email,, in_s3_uri, out_s3_uri, task_status, skip, times_run
                FROM task_list
                WHERE task_status = FALSE AND skip = FALSE
                """)

                iteration_count += 1

            execute_query(cursor, "UPDATE instance_details SET in_use = FALSE WHERE key = 'instance_1'")
            conn.commit()

        else:
            instance_details = fetch_one(cursor, "SELECT instance_status, in_use, cron_count, request_id, instance_id FROM instance_details WHERE key = 'instance_1'")

            # Ensure instance_details is valid before processing
            if instance_details:
                instance_status, in_use, cron_count, request_id, instance_id = instance_details

                if instance_status and not in_use:
                    if cron_count <= 3:
                        execute_query(cursor, "UPDATE instance_details SET cron_count = cron_count + 1 WHERE key = 'instance_1'")
                        print("Waiting for next cron job...")
                    else:
                        stop_instance(request_id, instance_id)
                        execute_query(cursor, "UPDATE instance_details SET instance_status = FALSE, cron_count = 0 WHERE key = 'instance_1'")

                elif instance_status and in_use:
                    print("Instance in use...")

                elif not instance_status:
                    print("Waiting for next cron job...")

            conn.commit()