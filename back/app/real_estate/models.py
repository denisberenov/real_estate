from django.db import models

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
    image = models.ImageField(upload_to='real_estate_images/', blank=True, null=True)  # NEW

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.city})"
