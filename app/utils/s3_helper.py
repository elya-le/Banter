import boto3
import os
import uuid

# get AWS credentials and bucket name from environment variables
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_BUCKET_NAME = os.getenv('AWS_BUCKET_NAME')
AWS_REGION = os.getenv('AWS_REGION')

S3_LOCATION = f"https://{AWS_BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

# configure the S3 client
s3_client = boto3.client(
    "s3",
    region_name=AWS_REGION,
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY
)

def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_file_to_s3(file, folder):
    try:
        # ensure the filename is unique
        filename = get_unique_filename(file.filename)
        file_path = f"{folder}/{filename}"
        
        # upload the file to S3
        s3_client.upload_fileobj(
            file,
            AWS_BUCKET_NAME,
            file_path,
            ExtraArgs={
                "ContentType": file.content_type
            }
        )
        
        # generate the file URL
        file_url = f"{S3_LOCATION}{file_path}"
        return {"url": file_url}
    except Exception as e:
        return {"errors": str(e)}

def remove_file_from_s3(file_url):
    # AWS needs the image file name, not the URL, so we split that out of the URL
    key = file_url.rsplit("/", 1)[1]
    try:
        s3_client.delete_object(Bucket=AWS_BUCKET_NAME, Key=key)
    except Exception as e:
        return {"errors": str(e)}
    return True
