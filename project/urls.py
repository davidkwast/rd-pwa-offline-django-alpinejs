from django.urls import path
from django.contrib import admin

from project.pwa import views


urlpatterns = [
    #
    path('workouts/pwa/html/pwa.html', views.workouts),
    path('workouts/pwa/html/', views.workouts),
    path('workouts/pwa/update/', views.update),
    path('workouts/pwa/ping/', views.ping),
    #
    path('__admin__/', admin.site.urls),
    #
    path('', views.home),
]
