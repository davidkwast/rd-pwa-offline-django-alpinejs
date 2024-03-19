from django.shortcuts import render
from django.http import HttpResponse

from . import models
from . import forms


def workouts(request):

    Form = forms.Workout
    form = Form(initial={'data': {}})

    #
    workouts = [
        {
            'id': o.id,
            'name': o.name,
            'fg_init': bool(o.ts_init),
            'fg_end': bool(o.ts_init),
        }
        for o in models.Workout.objects.filter(ts_init__isnull=True)
    ]
    #
    ctx = {
        'form': form,
        'jsdata': {'workouts': workouts},
    }
    #
    return render(request, 'workouts.html', ctx)


def update(request):

    Form = forms.Workout

    if request.method == 'POST':

        form = Form(request.POST)

        if form.is_valid():
            print(form.cleaned_data)

            data = form.cleaned_data['data']

            if 'id' in data:
                workout_obj = models.Workout.objects.get(pk=data['id'])

                if 'ts_init' in data and data['ts_init']:
                    workout_obj.ts_init = data['ts_init']

                if 'ts_end' in data and data['ts_end']:
                    workout_obj.ts_init = data['ts_end']

                if 'laps' in data and data['laps']:
                    for lap_ts in data['laps']:
                        models.Lap.objects.get_or_create(
                            workout=workout_obj,
                            ts=lap_ts,
                        )

                workout_obj.save()

            return HttpResponse('OK', status=201, content_type='text/plain')

        else:
            return HttpResponse('ERROR', status=400, content_type='text/plain')

    else:
        return HttpResponse('Not found', status=404, content_type='text/plain')


def ping(request):
    return HttpResponse('OK', status=200, content_type='text/plain')
