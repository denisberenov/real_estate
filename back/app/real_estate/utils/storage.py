import boto3
from django.conf import settings

def get_presigned_url(key: str, expires: int = 3600):
    s3 = boto3.client(
        "s3",
        endpoint_url=settings.AWS_S3_CUSTOM_DOMAIN,
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    )
    return s3.generate_presigned_url(
        "get_object",
        Params={"Bucket": settings.AWS_STORAGE_BUCKET_NAME, "Key": key},
        ExpiresIn=expires
    )
