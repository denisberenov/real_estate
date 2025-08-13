from rest_framework import viewsets
from .models import RealEstateObject
from .serializers import RealEstateObjectSerializer
from django.db.models import Q

class RealEstateObjectViewSet(viewsets.ModelViewSet):
    serializer_class = RealEstateObjectSerializer

    def get_queryset(self):
        queryset = RealEstateObject.objects.all().order_by('-created_at')

        city = self.request.query_params.get('city')
        price = self.request.query_params.get('price')
        area = self.request.query_params.get('area')
        rooms = self.request.query_params.get('rooms')
        property_type = self.request.query_params.get('property_type')

        if city:
            queryset = queryset.filter(city__icontains=city)

        if price:
            queryset = queryset.filter(price__lte=price)

        if area:
            queryset = queryset.filter(area__gte=area)

        if rooms:
            queryset = queryset.filter(rooms__gte=rooms)

        if property_type:
            queryset = queryset.filter(property_type=property_type)

        return queryset
