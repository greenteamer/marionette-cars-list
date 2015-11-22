# -*- coding: utf-8 -*-
from django.db import models


class Car(models.Model):
    model = models.CharField(max_length=120)
    price = models.IntegerField()
    description = models.TextField()
    year = models.DateField()
    createdAt = models.DateField(auto_now_add=True)

    # def photo(self):
    #     carImages = CarImage.objects.filter(car=self.id)
    #     image_list = []
    #     for image_obj in carImages:
    #         image_list.append(image_obj.image.name)
    #         # image_list.append("hello")
    #     return image_list

    def __unicode__(self):
        return self.model


class CarImage(models.Model):
    image = models.ImageField(upload_to="media")
    car = models.ForeignKey(Car, related_name='photo')

    def __unicode__(self):
        return self.car.model + ' - ' + self.image.name
