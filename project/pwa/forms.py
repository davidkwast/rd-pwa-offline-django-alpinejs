from django import forms


class Workout(forms.Form):
    data = forms.JSONField()
