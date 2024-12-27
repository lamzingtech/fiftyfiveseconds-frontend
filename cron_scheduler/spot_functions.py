import boto3, time, json, os
from dotenv import load_dotenv

# AWS credentials
load_dotenv()
aws_access_key = os.getenv('ACCESS_KEY')
aws_secret_key = os.getenv('SECRET_KEY')

# EC2 client with explicit credentials
ec2 = boto3.client(
    'ec2',
    region_name='sa-east-1',  # Replace with your region
    aws_access_key_id=aws_access_key,
    aws_secret_access_key=aws_secret_key
)

def start_instance():
    try:
        # Launch the Spot instance
        response = ec2.request_spot_instances(
            SpotPrice="0.5",  # Maximum price you are willing to pay
            InstanceCount=1,  # Number of instances to launch
            Type="one-time",
            LaunchSpecification={
                'ImageId': 'ami-03062e78aab5d2204',
                'InstanceType': 'g4dn.xlarge',
                'KeyName': 'manually-created-instance',
                'SecurityGroupIds': ['sg-0865c642da21993d0'],
            }
        )

        # Extract Spot Instance Request ID
        spot_request_id = response['SpotInstanceRequests'][0]['SpotInstanceRequestId']
        print(f"Spot Instance Request ID: {spot_request_id}")

        # Poll the Spot Request status until it's fulfilled
        instance_id = None
        for _ in range(10):  # Retry up to 30 times with 5-second intervals
            spot_status = ec2.describe_spot_instance_requests(SpotInstanceRequestIds=[spot_request_id])
            state = spot_status['SpotInstanceRequests'][0]['State']

            if state == "active":  # Spot request fulfilled
                instance_id = spot_status['SpotInstanceRequests'][0]['InstanceId']
                print(f"Spot Instance launched successfully with InstanceId: {instance_id}")
                break
            elif state == "failed":
                raise Exception(f"Spot Request failed: {spot_status['SpotInstanceRequests'][0]['Status']['Message']}")
            
            print(f"Spot request is in state '{state}', waiting...")
            time.sleep(5)  # Wait for 5 seconds before checking again

        if not instance_id:
            raise TimeoutError("Spot Instance Request not fulfilled within the expected time.")

        # Check instance initialization state and retrieve public IP
        for _ in range(5):  # Retry up to 5 times with 5-second intervals
            # Check instance status
            instance_status = ec2.describe_instances(InstanceIds=[instance_id])
            if not instance_status['Reservations']:
                raise Exception("No instance found for the given Instance ID.")
            if not instance_status['Reservations'][0]['Instances']:
                raise Exception("Instance details are not available yet.")

            instance_state = instance_status['Reservations'][0]['Instances'][0]['State']['Name']
            
            if instance_state == "running":
                instance_ip = instance_status['Reservations'][0]['Instances'][0].get('PublicIpAddress')
                if instance_ip:
                    print(f"Instance is running with Public IP: {instance_ip}")
                    return {
                        "statusCode": 200,
                        "body": json.dumps({
                            "message": "Spot Instance launched and initialized successfully",
                            "spot_request_id": spot_request_id,
                            "instance_id": instance_id,
                            "instance_ip": instance_ip
                        })
                    }

                print(f"Instance is running but Public IP not yet assigned. Waiting...")
            else:
                print(f"Instance state is '{instance_state}', waiting for it to initialize...")
            
            time.sleep(5)  # Wait for 5 seconds before checking again

        # Timeout if the instance does not get a public IP
        raise TimeoutError("Instance did not get a Public IP within the expected time.")

    except Exception as e:
        print(f"Error launching or initializing Spot instance: {str(e)}")
        return {
            "statusCode": 500,
            "body": json.dumps({
                "message": "Error launching or initializing Spot instance",
                "error": str(e)
            })
        }


def stop_instance():
    try:
        spot_request_id = "sir-vt3yzywm"
        instance_id = "i-0053976fb2e2f0608"
        print(f"Retrieved Spot Request ID: {spot_request_id} and Instance ID: {instance_id}")

        # Cancel the Spot Request
        cancel_response = ec2.cancel_spot_instance_requests(SpotInstanceRequestIds=[spot_request_id])
        print(f"Spot Request {spot_request_id} cancelled successfully.")

        # Terminate the EC2 instance
        terminate_response = ec2.terminate_instances(InstanceIds=[instance_id])
        print(f"Instance {instance_id} is being terminated.")

        return {
            "statusCode": 200,
            "body": json.dumps({
                "message": f"EC2 instance {instance_id} is being terminated, and Spot Request {spot_request_id} is cancelled.",
                "cancel_response": cancel_response,
                "terminate_response": terminate_response
            })
        }
    except Exception as e:
        print(f"Error stopping EC2 instance: {str(e)}")
        return {
            "statusCode": 500,
            "body": json.dumps({
                "message": "Error stopping EC2 instance.",
                "error": str(e)
            })
        }
