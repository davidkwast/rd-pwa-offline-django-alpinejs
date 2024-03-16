from django.urls import path

from project.pwa import views


urlpatterns = [
    #
    path('workouts/pwa/', views.workouts),
    #
]
