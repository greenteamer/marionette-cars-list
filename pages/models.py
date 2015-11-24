# -*- coding: utf-8 -*-
from django.db import models


class Page(models.Model):
    title = models.CharField(max_length=120)
    slug = models.CharField(max_length=120)
    description = models.TextField()
    createdAt = models.DateField(auto_now_add=True)

    def __unicode__(self):
        return self.title

