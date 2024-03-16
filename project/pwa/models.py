from django.db import models


class Workout(models.Model):
    name = models.CharField(max_length=32, unique=True)
    ts_init = models.DateTimeField(null=True)
    ts_end = models.DateTimeField(null=True)

    class Meta:
        ordering = ['pk']


class Lap(models.Model):
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
