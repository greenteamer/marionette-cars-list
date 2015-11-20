from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth.models import User
from rest_framework import viewsets
from cars.serializers import *
from models import *


def indexView(request, template_name="cars/index.html"):

    return render_to_response(template_name, locals(),
        context_instance=RequestContext(request))


# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# ViewSets define the view behavior.
class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
