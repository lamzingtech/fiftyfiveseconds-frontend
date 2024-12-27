import os
import psycopg2
import requests
from dotenv import load_dotenv
from spot_functions import start_instance, stop_instance

# Load environment variables
load_dotenv()
ov_port = os.getenv("OV_PORT")

# Database connection
conn = psycopg2.connect(
    dbname="55-secs",
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASS"),
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT")
)
cursor = conn.cursor()

# Start the scheduler
while True:
    # Fetch task_list entries with task_status = false and skip = false
    cursor.execute("""
        SELECT uuid, in_s3_uri, times_run, voice_accent 
        FROM task_list 
        WHERE task_status = false AND skip = false
        LIMIT 1;
    """)
    task = cursor.fetchone()

    # Fetch instance_details for instance_1
    cursor.execute("SELECT instance_status, instance_ip, spot_request_id, instance_id, cron_count FROM instance_details WHERE key = 'instance_1';")
    instance = cursor.fetchone()

    if task:
        uuid, in_s3_uri, times_run, voice_accent = task

        if not instance[0]:  # instance_status is false
            instance_response = start_instance()
            spot_request_id = instance_response["spot_request_id"]
            instance_id = instance_response["instance_id"]
            instance_ip = instance_response["instance_ip"]

            # Update instance_details
            cursor.execute("""
                UPDATE instance_details 
                SET spot_request_id = %s, instance_id = %s, instance_ip = %s, instance_status = true 
                WHERE key = 'instance_1';
            """, (spot_request_id, instance_id, instance_ip))
            conn.commit()

        instance_ip = instance[1]
        if times_run <= 5:
            response = requests.post(
                f"http://{instance_ip}:{ov_port}/clone_voice/",
                headers={
                    "accept": "application/json",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data={
                    "s3_uri": in_s3_uri,
                    "prompt": "Generate a summary of the audio in less than 200 words",
                    "text_string": "",
                    "accent": voice_accent,
                    "speed": "1",
                    "filename": "Generated_Voice"
                }
            )

            if response.status_code == 200:
                s3_generated_voice = response.json().get("s3_generated_voice")
                summary = response.json().get("summary")

                # Update task_list
                cursor.execute("""
                    UPDATE task_list 
                    SET task_status = true, out_s3_uri = %s, summary = %s
                    WHERE uuid = %s;
                """, (s3_generated_voice, summary, uuid))
            elif response.status_code == 500:
                debug_msg = response.text

                # Update task_list
                cursor.execute("""
                    UPDATE task_list 
                    SET times_run = times_run + 1, debug_msg = %s 
                    WHERE uuid = %s;
                """, (debug_msg, uuid))

            conn.commit()

        if times_run > 5:
            # Update task_list to skip=true
            cursor.execute("""
                UPDATE task_list 
                SET skip = true 
                WHERE uuid = %s;
            """, (uuid,))
            conn.commit()

    else:  # No task_status = false
        cron_count = instance[4]

        if cron_count <= 3:
            # Increment cron_count
            cursor.execute("""
                UPDATE instance_details 
                SET cron_count = cron_count + 1 
                WHERE key = 'instance_1';
            """)
            conn.commit()
            print("Waiting for next cron job...")
        else:
            spot_request_id = instance[2]
            instance_id = instance[3]

            # Stop instance
            stop_instance(spot_request_id, instance_id)

            # Update instance_status to false
            cursor.execute("""
                UPDATE instance_details 
                SET instance_status = false, cron_count = 0 
                WHERE key = 'instance_1';
            """)
            conn.commit()

        break  # Exit the loop

# Close the database connection
cursor.close()
conn.close()
