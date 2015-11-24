# -*- coding: utf-8 -*-
from rest_framework import serializers
from django.contrib.auth.models import User
from models import *


# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'is_staff')


# class CarSerializer(serializers.HyperlinkedModelSerializer):

#     class Meta:
#         model = Car
#         fields = ('url', 'id', 'photo', 'model', 'price', 'description', 'year', 'createdAt')


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarImage
        fields = ('id', 'car', 'image')


class CarSerializer(serializers.ModelSerializer):
    photo = PhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Car
        fields = ('url', 'id', 'photo', 'model', 'price', 'description', 'year', 'createdAt')
