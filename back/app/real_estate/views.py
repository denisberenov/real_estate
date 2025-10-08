from django.core.cache import cache
from rest_framework import viewsets, status, mixins
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from django.db.models import Q
from .models import RealEstateObject
from .serializers import (
    RealEstateObjectWriteSerializer,
    RealEstateObjectReadSerializer,
)
from rest_framework.decorators import action
from .tasks import send_delete_otp  

class RealEstateObjectViewSet(viewsets.ModelViewSet):
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_queryset(self):
        qs = RealEstateObject.objects.all().prefetch_related("images").order_by("-created_at")

        city = self.request.query_params.get("city")
        price = self.request.query_params.get("price")           # <= price__lte
        area = self.request.query_params.get("area")             # <= matches area_sq_m
        rooms = self.request.query_params.get("rooms")           # <= rooms__gte
        property_type = self.request.query_params.get("property_type")
        
        cache_key = f"real_estate:{city}:{price}:{area}:{rooms}:{property_type}"
        cached_data = cache.get(cache_key)
        if cached_data:
            return cached_data

        if city:
            qs = qs.filter(city__icontains=city)

        if price:
            try:
                qs = qs.filter(price__lte=price)
            except Exception:
                pass

        if area:
            try:
                qs = qs.filter(area_sq_m__gte=area)  # <-- field name fix
            except Exception:
                pass

        if rooms:
            try:
                qs = qs.filter(rooms__gte=int(rooms))
            except Exception:
                pass

        if property_type:
            qs = qs.filter(property_type=property_type)

        cache.set(cache_key, qs, timeout=600)
        
        return qs

    def get_serializer_class(self):
        # Write serializer for create/update; read serializer for list/retrieve
        if self.action in ("create", "update", "partial_update"):
            return RealEstateObjectWriteSerializer
        return RealEstateObjectReadSerializer

    def create(self, request, *args, **kwargs):
        # Split normal fields and files
        data = request.data.dict()
        
        # Accept both `images` and `images[]`
        images = request.FILES.getlist("images") or request.FILES.getlist("images[]")

        # Merge files back into serializer input
        # If your serializer has `images = serializers.ListField(child=...)`
        # or uses a nested Image model, pass the files as part of `data`
        serializer = self.get_serializer(data={**data, "images": images})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        # Normalize `images[]` on PATCH/PUT as well (to append images)
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        data = request.data.copy()
        if "images" not in data:
            files_alt = request.FILES.getlist("images[]")
            if files_alt:
                data.setlist("images", files_alt)

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=["post"])
    def request_delete(self, request, pk=None):
        """Send OTP to the email address of the object owner."""
        obj = self.get_object()

        # For now let's assume `obj` has a field `email`
        if not obj.email:
            return Response({"error": "No email associated"}, status=status.HTTP_400_BAD_REQUEST)

        # Generate OTP (e.g. 6-digit random)
        import random
        otp = str(random.randint(100000, 999999))

        # Store OTP temporarily (DB, cache, Redis, etc.)
        # simplest: attach to obj for now
        obj.deletion_otp = otp
        obj.save(update_fields=["deletion_otp"])

        # Send OTP via Celery
        send_delete_otp.delay(obj.email, otp)

        return Response({"message": f"OTP sent to {obj.email}"}, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=["post"])
    def confirm_delete(self, request, pk=None):
        obj = self.get_object()
        otp = request.data.get("otp")

        if otp != obj.deletion_otp:
            return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)

        obj.delete()
        return Response({"success": True}, status=status.HTTP_200_OK)
