# pathfinder/consumers.py
from channels.generic.websocket import AsyncWebsocketConsumer
import json


class VisualizeConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data=None, bytes_data=None):
        # You can handle received data here
        await self.send(text_data=json.dumps({"message": "Echo message"}))
