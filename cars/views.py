from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from cars.serializers import *
from models import *


def indexView(request, template_name="cars/index.html"):

    return render_to_response(template_name, locals(),
        context_instance=RequestContext(request))


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = CarImage.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [IsAuthenticated]

    def pre_save(self, obj):
        obj.image = self.request.FILES.get('file')

class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [IsAuthenticated]
