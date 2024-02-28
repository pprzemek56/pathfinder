import asyncio
import json

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


def emit_event(event_name, message, debug):
    if not debug:
        return

    channel_layer = get_channel_layer()
    room_group_name = 'group_visualization_room'

    async def set_delay():
        await asyncio.sleep(1)
        await channel_layer.group_send(
            room_group_name,
            {
                'type': 'broadcast_message',
                'message': json.dumps({'event': event_name, 'detail': message})
            }
        )

    async_to_sync(set_delay)()
