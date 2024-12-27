import os
import psycopg2
import requests
import json
from dotenv import load_dotenv
from spot_functions import start_instance, stop_instance

# Load environment variables
load_dotenv()
# ov_port = os.getenv("OV_PORT")

# Database connection setup
def get_db_connection():
    return psycopg2.connect(
        database=os.getenv("DB_NAME"),
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
        try:
            # Check if there are tasks to process
            tasks = fetch_all(cursor, """
            SELECT uuid, task_id, email, in_s3_uri, out_s3_uri, task_status, skip, times_run
            FROM task_list
            WHERE task_status = FALSE AND skip = FALSE
            """)
        except Exception as e:
            print(f"CRON - Error fetching tasks: {e}")

        if tasks:
            try :
                instance_details = fetch_one(cursor, "SELECT * FROM instance_details WHERE key = 'instance_1'")
            except Exception as e:
                print(f"CRON - Error fetching instance_details: {e}")

            # Ensure instance_details is not None before accessing keys
            if instance_details and not instance_details['instance_status']:
                try :
                    response = start_instance()
                    update_instance_details(conn, (
                        True,
                        response['instance_ip'],
                        response['request_id'],
                        response['instance_id'],
                        False,
                        0
                    ))
                    print("CRON - Instance started successfully")
                except Exception as e:
                    print(f"CRON - Error starting instance: {e}")

            # Add a safeguard for infinite loops
            max_iterations = os.getenv("MAX_ITERATIONS")
            iteration_count = 0

            while tasks:
                if iteration_count >= max_iterations:
                    print("CRON - Maximum iterations reached. Exiting loop to prevent infinite processing.")
                    break

                execute_query(cursor, "UPDATE instance_details SET in_use = TRUE WHERE key = 'instance_1'")
                conn.commit()

                for task in tasks:
                    uuid, task_id, email, in_s3_uri, out_s3_uri, task_status, skip, times_run = task
                    
                    try:
                        print(f"CRON - [ {uuid} ] - Processing task...")
                        # Use a configurable parameter for times_run threshold
                        max_times_run = int(os.getenv("MAX_TIMES_RUN", 5))

                        if times_run > max_times_run:
                            execute_query(cursor, "UPDATE task_list SET skip = TRUE WHERE uuid = %s", (uuid,))
                            conn.commit()
                            print(f"[ {uuid} ] - Skipping task due to times_run threshold.")
                            continue

                        try:    
                            instance_ip = fetch_one(cursor, "SELECT instance_ip FROM instance_details WHERE key = 'instance_1'")[0]
                        except Exception as e:
                            print(f"CRON - [ {uuid} ] - Error fetching instance_ip: {e}")
                            continue
                        
                        try:
                            print(f"CRON - [ {uuid} ] - Sending request to http://{instance_ip}:{os.getenv('OV_PORT')}/clone_voice/")
                            response = requests.post(
                                f"http://{instance_ip}:{os.getenv("OV_PORT")}/clone_voice/",
                                headers={
                                    'accept': 'application/json',
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                data={
                                    'video_url': in_s3_uri,
                                    'prompt': 'Generate a summary of the audio in less than 200 words',
                                    'text_string': '',
                                    'accent': os.getenv("VOICE_ACCENT"),
                                    'speed': 1,
                                    'filename': 'Generated_Voice'
                                }
                            )
                            print(f"CRON - [ {uuid} ] - Response status code: {response.status_code}")
                        except Exception as e:
                            print(f"CRON - [ {uuid} ] - Error making request: {e}")
                            continue

                        if response.status_code == 200:
                            print(f"CRON - [ {uuid} ] - Task completed.")
                            s3_generated_voice = response.json().get('s3_generated_voice')
                            summary = response.json().get('summary')
                            execute_query(cursor, """
                            UPDATE task_list
                            SET task_status = TRUE, out_s3_uri = %s, summary = %s
                            WHERE uuid = %s
                            """, (s3_generated_voice, summary, uuid))
                        elif response.status_code == 500:
                            print(f"CRON - [ {uuid} ] - Task failed. Times run: {times_run + 1}")
                            execute_query(cursor, """
                            UPDATE task_list
                            SET times_run = times_run + 1
                            WHERE uuid = %s
                            """, (uuid,))

                            execute_query(cursor, """
                            INSERT INTO debug_logs (uuid, run_count, debug_log)
                            VALUES (%s, %s, %s)
                            """, (uuid, times_run + 1, response.text))
                            print(f"CRON - [ {uuid} ] - Debug log saved.\n Log: \n{response.text}")
                    except  Exception as e:
                        print(f"CRON - [ {uuid} ] - Error processing task:\n{e}")

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
            try:
                instance_details = fetch_one(cursor, "SELECT instance_status, in_use, cron_count, request_id, instance_id FROM instance_details WHERE key = 'instance_1'")
            except Exception as e:
                print(f"CRON - Error fetching instance_details: {e}")
                instance_details = None

            # Ensure instance_details is valid before processing
            if instance_details:
                instance_status, in_use, cron_count, request_id, instance_id = instance_details
                try:
                    if instance_status and not in_use:
                        if cron_count <= 3:
                            execute_query(cursor, "UPDATE instance_details SET cron_count = cron_count + 1 WHERE key = 'instance_1'")
                            print("CRON - Waiting for next cron job...")
                        else:
                            stop_instance(request_id, instance_id)
                            execute_query(cursor, "UPDATE instance_details SET instance_status = FALSE, cron_count = 0 WHERE key = 'instance_1'")
                            print("CRON - Stopping instance...")

                    elif instance_status and in_use:
                        print("CRON - Instance in use...")

                    elif not instance_status:
                        print("CRON - Waiting for next cron job...")
                except Exception as e:
                    print(f"CRON - Error updating instance_details: {e}")

            conn.commit()
