from django.conf.urls import include, url, patterns
from django.contrib import admin
from django.conf import settings

from rest_framework import routers
from cars.serializers import *
from cars.views import *

from pages.serializers import *
from pages.views import *


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'cars', CarViewSet)
router.register(r'photo', PhotoViewSet)
router.register(r'pages', PageViewSet)


urlpatterns = patterns('',
    url(r'^', include('cars.urls')),
    url(r'^api/v1/', include(router.urls)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
)


if settings.DEBUG:
    urlpatterns += patterns(
        '',
        url(
            r'^static/(?P<path>.*)$', 'django.views.static.serve',
            {'document_root': settings.STATIC_ROOT}
        ),

        url(
            r'^media/(?P<path>.*)$', 'django.views.static.serve',
            {'document_root': settings.MEDIA_ROOT}
        ),
    )
