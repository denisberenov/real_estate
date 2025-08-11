from rest_framework import viewsets
from .models import RealEstateObject
from .serializers import RealEstateObjectSerializer

class RealEstateObjectViewSet(viewsets.ModelViewSet):
    queryset = RealEstateObject.objects.all().order_by('-created_at')
    serializer_class = RealEstateObjectSerializer
