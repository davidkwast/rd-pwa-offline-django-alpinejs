from django.core.management.base import BaseCommand

from ... import models


#
class Command(BaseCommand):
    #
    def handle(self, *args, **options):
        #
        models.Workout.objects.update_or_create(name='2024-01-01 - Parque')
        #
        models.Workout.objects.update_or_create(name='2024-01-02 - Rua X')
        #
