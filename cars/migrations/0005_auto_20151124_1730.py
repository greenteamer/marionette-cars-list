# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0004_auto_20151119_1925'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carimage',
            name='car',
            field=models.ForeignKey(related_name='photo', to='cars.Car'),
        ),
    ]
