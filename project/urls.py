from django.conf.urls import include, url
from django.contrib import admin

from rest_framework import routers
from cars.serializers import *
from cars.views import *


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'cars', CarViewSet)


urlpatterns = [
    url(r'^', include('cars.urls')),
    url(r'^api/v1/', include(router.urls)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
