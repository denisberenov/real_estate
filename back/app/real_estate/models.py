# models.py
from django.db import models
import uuid, os
from django.utils import timezone

def real_estate_image_upload_to(instance, filename):
    # Works with MinIO/S3: this is the object key
    _, ext = os.path.splitext(filename)
    ext = (ext or ".jpg").lower()
    return f"real_estate_images/{timezone.now():%Y/%m}/{uuid.uuid4().hex}{ext}"

class RealEstateObject(models.Model):
    PROPERTY_TYPES = [
        ('house', 'House'),
        ('apartment', 'Apartment'),
        ('commercial', 'Commercial'),
        ('land', 'Land'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    address = models.CharField(max_length=512)
    city = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    area_sq_m = models.DecimalField(max_digits=10, decimal_places=2)
    rooms = models.IntegerField()
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPES)
    image = models.ImageField(upload_to='real_estate_images/', blank=True, null=True)  # optional cover
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.city})"

class RealEstateImage(models.Model):
    real_estate_object = models.ForeignKey(
        RealEstateObject,
        related_name="images",
        on_delete=models.CASCADE,
        db_index=True,
    )
    image = models.ImageField(upload_to=real_estate_image_upload_to)
    alt = models.CharField(max_length=255, blank=True, default="")
    is_primary = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "id"]
