# app/serializers.py
from rest_framework import serializers
from .models import RealEstateObject, RealEstateImage
from .utils.storage import get_presigned_url


class RealEstateImageSerializer(serializers.ModelSerializer):
    # Expose a URL that works with MinIO (public or signed depending on settings)
    url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = RealEstateImage
        fields = ["id", "url", "alt", "is_primary", "order", "created_at"]

    def get_url(self, obj):
        if obj.image:
            return get_presigned_url(obj.image.name)
        return None


class RealEstateObjectWriteSerializer(serializers.ModelSerializer):
    """
    Used for create/update. Accepts multiple files via `images`.
    Keeps your existing single `image` field as an optional cover.
    """
    images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False,
        help_text="Upload one or more images (multipart files).",
    )

    class Meta:
        model = RealEstateObject
        fields = [
            "id", "title", "description", "address", "city",
            "price", "area_sq_m", "rooms", "property_type",
            "email",
            "image",        # optional cover image (your original field)
            "images",       # NEW: list of additional images to attach
            "created_at",
        ]
        read_only_fields = ["created_at"]

    def validate_images(self, files):
        max_files = 20
        if len(files) > max_files:
            raise serializers.ValidationError(f"Up to {max_files} images allowed.")
        for f in files:
            ctype = getattr(f, "content_type", "") or ""
            if not ctype.startswith("image/"):
                raise serializers.ValidationError(f"{getattr(f, 'name', 'file')} is not an image.")
        return files

    def create(self, validated_data):
        files = validated_data.pop("images", [])
        obj = RealEstateObject.objects.create(**validated_data)
        if files:
            RealEstateImage.objects.bulk_create([
                RealEstateImage(real_estate_object=obj, image=f, order=i)
                for i, f in enumerate(files)
            ])
        return obj

    def update(self, instance, validated_data):
        # Append new images if provided; existing related images are kept
        files = validated_data.pop("images", [])
        instance = super().update(instance, validated_data)
        if files:
            start = (instance.images.order_by("-order").first().order + 1) if instance.images.exists() else 0
            RealEstateImage.objects.bulk_create([
                RealEstateImage(real_estate_object=instance, image=f, order=start + i)
                for i, f in enumerate(files)
            ])
        return instance


class RealEstateObjectReadSerializer(serializers.ModelSerializer):
    """
    Used for GET responses. Returns the related images as URLs + metadata.
    """
    images = RealEstateImageSerializer(many=True, read_only=True)

    class Meta:
        model = RealEstateObject
        fields = [
            "id",
            "title",
            "description",
            "address",
            "city",
            "price",
            "area_sq_m",
            "rooms",
            "property_type",
            "email",       # ✅ include this
            "image",       # cover image
            "images",      # related gallery
            "created_at",
        ]
        read_only_fields = fields
