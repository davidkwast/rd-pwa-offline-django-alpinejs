from django.shortcuts import render
from django.http import HttpResponse

from . import models
from . import forms


def workouts(request):

    Form = forms.Workout

    if request.method == 'POST':

        form = Form(request.POST)

        if form.is_valid():
            print(form.cleaned_data)
            return HttpResponse('OK', status=200, content_type='text/plain')

        else:
            return HttpResponse('ERROR', status=400, content_type='text/plain')

    else:
        form = Form(initial={'data': {}})

    #
    workouts = [
        {
            'id': o.id,
            'name': o.name,
            'fg_init': bool(o.ts_init),
            'fg_end': bool(o.ts_init),
        }
        for o in models.Workout.objects.all()
    ]
    #
    ctx = {
        'form': form,
        'jsdata': {'workouts': workouts},
    }
    #
    return render(request, 'workouts.html', ctx)
