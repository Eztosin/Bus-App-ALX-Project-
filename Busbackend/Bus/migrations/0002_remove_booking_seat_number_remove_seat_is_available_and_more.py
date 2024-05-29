# Generated by Django 5.0.6 on 2024-05-29 11:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Bus', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='seat_number',
        ),
        migrations.RemoveField(
            model_name='seat',
            name='is_available',
        ),
        migrations.CreateModel(
            name='ScheduleSeat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_available', models.BooleanField(default=True)),
                ('schedule', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='schedule_seats', to='Bus.schedule')),
                ('seat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='schedule_seats', to='Bus.seat')),
            ],
        ),
        migrations.AddField(
            model_name='booking',
            name='schedule_seat',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='bookings', to='Bus.scheduleseat'),
        ),
    ]
