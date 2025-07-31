from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RealEstateObjectViewSet

router = DefaultRouter()
router.register(r'objects', RealEstateObjectViewSet, basename='realestateobject')

urlpatterns = [
    path('', include(router.urls)),
]
