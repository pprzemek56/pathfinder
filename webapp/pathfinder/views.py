from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

from pathfinder.serializers import BoardSerializer


@api_view(["POST"])
def visualize(request: Request):
    board_serializer = BoardSerializer(data=request.data)

    if board_serializer.is_valid():
        board = board_serializer.save()
    else:
        return Response(data=board_serializer.errors)




    return Response()
