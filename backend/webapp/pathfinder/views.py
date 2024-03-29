from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

from . import algorithms
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
    elif board.algorithm == "bfs":
        visited, shortest_path = algorithms.bfs_algorithm(board)
    elif board.algorithm == "dijkstras":
        visited, shortest_path = algorithms.djikstras_algorithm(board)
    elif board.algorithm == "a_star":
        visited, shortest_path = algorithms.a_star_algorithm(board)
    elif board.algorithm == "greedy_bfs":
        visited, shortest_path = algorithms.greedy_best_first_search(board)

    path_serializer = PathSerializer(data={"visited": visited, "shortest_path": shortest_path})
    if path_serializer.is_valid():
        response = Response(data=path_serializer.data)
    else:
        return Response(data=path_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return response


@api_view(["POST"])
def visualize_with_debug(request: Request):
    board_serializer = BoardSerializer(data=request.data)

    if board_serializer.is_valid():
        board = board_serializer.save()
    else:
        return Response(data=board_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    visited = []
    shortest_path = []

    if board.algorithm == "dfs":
        visited, shortest_path = algorithms.dfs_algorithm(board, True)
    elif board.algorithm == "bfs":
        visited, shortest_path = algorithms.bfs_algorithm(board, True)
    elif board.algorithm == "dijkstras":
        visited, shortest_path = algorithms.djikstras_algorithm(board, True)
    elif board.algorithm == "a_star":
        visited, shortest_path = algorithms.a_star_algorithm(board, True)
    elif board.algorithm == "greedy_bfs":
        visited, shortest_path = algorithms.greedy_best_first_search(board, True)

    path_serializer = PathSerializer(data={"visited": visited, "shortest_path": shortest_path})
    if path_serializer.is_valid():
        response = Response(data=path_serializer.data)
    else:
        return Response(data=path_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return response

