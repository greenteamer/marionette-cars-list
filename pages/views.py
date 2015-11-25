from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from pages.serializers import *
from models import Page


class PageViewSet(viewsets.ModelViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    permission_classes = [IsAuthenticated]
