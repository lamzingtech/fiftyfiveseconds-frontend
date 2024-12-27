Let's write a python program that:

1. Load dotenv()
    1. ov_port = OV_PORT
2. Reads a table "task_list" in a postgres db called “55-secs”, which has schema:
    1. uuid (primary key): varchar
    2. task_id: varchar
    3. email: varchar
    4. voice_accent: varchar (default=ind)
    5. in_s3_uri: varchar
    6. out_s3_uri: varchar
    7. task_status: bool (default=false)
    8. times_run: int
    9. debug_msg: varchar
3. Reads a second table “instance_details” in the same db, which has a single static key “instance_1” and schema:
    1. instance_status: bool (default=false)
    2. instance_ip: varchar
    3. spot_request_id: varchar
    4. instance_id: varchar
    5. skip: bool (default=false)
    6. cron_count: int (default=0)
    7. in_use: bool (default=false)
4. If the task_list contains any records with task_status=false and skipped=false:
    1. And if instance_status=false:
        1. Let's call a “start_instance” function that I wrote already, this function returns json response with:
            1. spot_request_id
            2. instance_id
            3. instance_ip
        2. Update the instance_details table with:
            1. spot_request_id
            2. instance_id
            3. instance_ip
        3. Update in_use=True (In instance_details), Loop following until there is no more records with task_status=false:
            1. For the first record in task_list with task_status=false and skip=false, get its uuid, in_s3_uri, times_run and voice_accent
            2. Get instance_ip from instance_details
            3. If times_run<=5, Make a post request like this:
            ```
            curl -X 'POST' \
                'http://<instance_ip>:<ov_port>/clone_voice/' \
                -H 'accept: application/json' \
                -H 'Content-Type: application/x-www-form-urlencoded' \
                -d 's3_uri=<in_s3_uri>&prompt=Generate%20a%20summary%20of%20the%20audio%20in%20less%20than%20200%20words&text_string=%20&accent=<voice_accent>&speed=1&filename=Generated_Voice'
            ```
        4. After there is no more records with task_status=false and skip=false in task_list, in instance_details update in_use=False


1. If response statuscode is 200,
    1. From JsonResponse, get s3_generated_voice
    2. Update this record in task_list with fields:
        1. task_status = True
        2. out_s3_uri = s3_generated_voice
2. If response statuscode is 500, for this record in task_list
    1. Increment times_run by 1
    2. Write the response body into debug_msg
3. If times_run>5, Update skip=true
4. If instance_status=true, do the loop as described in 4.1.3. Above.
5. If the task_list does not contain any task_status=false entries and in instance_details, if in_use=False
    1. Read instance_details and get cron_count, spot_request_id, instance_id
    2. If cron_count is <= 3:
        1. Increment cron_count by 1
        2. Print “Waiting for next cron job...”
    3. If cron_count is > 3:
        1. call a “stop_instance” function that I wrote already, passing parameters spot_request_id, instance_id
        2. Update instance_status=false in instance_details’s instance_1
6. Else if  print "Waiting for next cron job..."