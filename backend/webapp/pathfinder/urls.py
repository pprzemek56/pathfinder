from django.urls import path

from . import views

urlpatterns = [
    path('visualize/', views.visualize, name="visualize"),
    path('visualize_with_debug/', views.visualize_with_debug, name="visualize_with_debug"),
]
