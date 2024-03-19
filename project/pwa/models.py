from django.db import models


class Workout(models.Model):
    name = models.CharField(max_length=32, unique=True)
    ts_init = models.IntegerField(null=True)
    ts_end = models.IntegerField(null=True)

    class Meta:
        ordering = ['pk']


class Lap(models.Model):
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
    ts = models.IntegerField(null=True)
