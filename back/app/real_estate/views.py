# views.py
from rest_framework import viewsets, status, mixins
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from django.db.models import Q
from .models import RealEstateObject
from .serializers import (
    RealEstateObjectWriteSerializer,
    RealEstateObjectReadSerializer,
)

class RealEstateObjectViewSet(viewsets.ModelViewSet):
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_queryset(self):
        qs = RealEstateObject.objects.all().prefetch_related("images").order_by("-created_at")

        city = self.request.query_params.get("city")
        price = self.request.query_params.get("price")           # <= price__lte
        area = self.request.query_params.get("area")             # <= matches area_sq_m
        rooms = self.request.query_params.get("rooms")           # <= rooms__gte
        property_type = self.request.query_params.get("property_type")

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

        return qs

    def get_serializer_class(self):
        # Write serializer for create/update; read serializer for list/retrieve
        if self.action in ("create", "update", "partial_update"):
            return RealEstateObjectWriteSerializer
        return RealEstateObjectReadSerializer

    def create(self, request, *args, **kwargs):
        # Accept both `images` and `images[]`
        data = request.data.copy()
        if "images" not in data:
            files_alt = request.FILES.getlist("images[]")
            if files_alt:
                data.setlist("images", files_alt)

        # Optional debug
        # print("DATA:", {k: data.getlist(k) for k in data})
        # print("FILES keys:", list(request.FILES.keys()))

        serializer = self.get_serializer(data=data)
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
