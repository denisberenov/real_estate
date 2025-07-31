from rest_framework import serializers
from .models import RealEstateObject

class RealEstateObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = RealEstateObject
        fields = '__all__'
