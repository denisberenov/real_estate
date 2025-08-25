# tasks.py
from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings

@shared_task
def send_delete_otp(email, otp):
    send_mail(
        subject="Confirm deletion",
        message=f"Your OTP for deletion is {otp}",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[email],
    )
