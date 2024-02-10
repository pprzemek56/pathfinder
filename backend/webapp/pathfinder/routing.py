# pathfinder/routing.py
from django.urls import path
from . import consumers

websocket_urlpatterns = [
    # Define your WebSocket URL routing here
    path('ws/visualize/', consumers.VisualizeConsumer.as_asgi()),
]