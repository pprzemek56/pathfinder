from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

from . import algorithms
from .models import Path
from .serializers import BoardSerializer, PathSerializer


@api_view(["POST"])
def visualize(request: Request):
    board_serializer = BoardSerializer(data=request.data)

    if board_serializer.is_valid():
        board = board_serializer.save()
    else:
        return Response(data=board_serializer.errors)

    visited = []
    shortest_path = []

    if board.algorithm == "dfs":
        visited, shortest_path = algorithms.dfs_algorithm(board)

    path_serializer = PathSerializer(data={"visited": visited, "shortest_path": shortest_path})
    if path_serializer.is_valid():
        response = Response(data=path_serializer.data)
    else:
        return Response(data=path_serializer.errors)

    return response
