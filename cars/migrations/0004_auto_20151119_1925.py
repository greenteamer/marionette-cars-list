# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0003_auto_20151119_1906'),
    ]

    operations = [
        migrations.RenameField(
            model_name='carimage',
            old_name='car_id',
            new_name='car',
        ),
        migrations.AlterField(
            model_name='carimage',
            name='image',
            field=models.ImageField(upload_to=b'media'),
        ),
    ]
