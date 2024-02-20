import json

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


def emit_event(event_name, message, debug=False):
    if not debug:
        pass

    channel_layer = get_channel_layer()
    room_group_name = 'group_visualization_room'

    async_to_sync(channel_layer.group_send)(
        room_group_name,
        {
            'type': 'broadcast_message',
            'message': json.dumps({'event': event_name, 'detail': message})
        }
    )
