import boto3
import uuid
from flask import current_app

s3 = boto3.client(
    "s3",
    aws_access_key_id=current_app.config["AWS_ACCESS_KEY_ID"],
    aws_secret_access_key=current_app.config["AWS_SECRET_ACCESS_KEY"],
    region_name=current_app.config["AWS_REGION"],
)

def generate_unique_filename(filename):
    ext = filename.split('.')[-1]
    unique_filename = f"{uuid.uuid4()}.{ext}"
    return unique_filename

def upload_file_to_s3(file, acl="public-read"):
    try:
        unique_filename = generate_unique_filename(file.filename)
        s3.upload_fileobj(
            file,
            current_app.config["AWS_S3_BUCKET_NAME"],
            unique_filename,
            ExtraArgs={"ACL": acl, "ContentType": file.content_type}
        )
        file_url = f"https://{current_app.config['AWS_S3_BUCKET_NAME']}.s3.amazonaws.com/{unique_filename}"
        return file_url
    except Exception as e:
        print("Error uploading file to S3:", e)
        return None

def delete_file_from_s3(file_url):
    try:
        file_key = file_url.split("/")[-1]
        s3.delete_object(Bucket=current_app.config["AWS_S3_BUCKET_NAME"], Key=file_key)
        return True
    except Exception as e:
        print("Error deleting file from S3:", e)
        return False
