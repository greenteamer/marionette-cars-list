# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='carimage',
            name='car_id',
            field=models.ForeignKey(default=1, to='cars.Car'),
            preserve_default=False,
        ),
    ]
