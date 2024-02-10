import json

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


def emit_event(event_name, message):
    channel_layer = get_channel_layer()
    room_group_name = 'group_visualization_room'  # Ensure this matches your consumer group name

    # Use async_to_sync to call the asynchronous group_send method
    async_to_sync(channel_layer.group_send)(
        room_group_name,
        {
            'type': 'broadcast_message',  # Matches the method in the consumer
            'message': json.dumps({'event': event_name, 'detail': message})
        }
    )
