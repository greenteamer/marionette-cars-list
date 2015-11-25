# -*- coding: utf-8 -*-
from rest_framework import serializers
from models import *


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ('url', 'id', 'title', 'slug', 'description', 'createdAt')
