# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0002_carimage_car_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='car',
            name='name',
        ),
        migrations.AddField(
            model_name='car',
            name='createdAt',
            field=models.DateField(default=datetime.datetime(2015, 11, 19, 19, 4, 47, 927555, tzinfo=utc), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='car',
            name='description',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='car',
            name='model',
            field=models.CharField(default='', max_length=120),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='car',
            name='price',
            field=models.IntegerField(default=20000),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='car',
            name='year',
            field=models.DateField(default=datetime.datetime(2015, 11, 19, 19, 6, 21, 356067, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
