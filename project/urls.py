from django.urls import path

from project.pwa import views


urlpatterns = [
    #
    path('workouts/pwa/html/', views.workouts),
    path('workouts/pwa/update/', views.update),
    #
]
