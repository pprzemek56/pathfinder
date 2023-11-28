import time
import heapq
import itertools
from collections import deque
from multiprocessing import Process, Queue

from .models import Board


def manhattan_distance(start, end):
    return abs(start['x'] - end['x']) + abs(start['y'] - end['y'])


def greedy_best_first_search(board: Board):
    start, end = board.find_start_end()
    heuristic = lambda node: manhattan_distance(node, end)
    start_time = time.time()

    visited = []
    path_found = False
    parents = {}
    sequence_number = itertools.count()

    priority_queue = [(heuristic(start), next(sequence_number), start)]

    while priority_queue:
        if time.time() - start_time > 1.0:
            return None, None
        _, _, current_node = heapq.heappop(priority_queue)
        cx, cy = current_node['x'], current_node['y']

        if current_node not in visited:
            visited.append(current_node)

        if current_node == end:
            path_found = True
            break

        for dy, dx in [(0, -1), (1, 0), (0, 1), (-1, 0)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= ny < len(board.board) and 0 <= nx < len(board.board[0]):
                neighbor_node = board.board[ny][nx]
                if neighbor_node['type'] != 1:
                    if {'x': nx, 'y': ny} not in visited:
                        heapq.heappush(priority_queue,
                                       (heuristic({'x': nx, 'y': ny}), next(sequence_number), {'x': nx, 'y': ny}))
                        parents[(nx, ny)] = current_node

    if not path_found:
        return None, None

    shortest_path = []
    current = end
    while current != start:
        shortest_path.append(current)
        current = parents.get((current['x'], current['y']), start)
    shortest_path.append(start)
    shortest_path.reverse()

    return visited, shortest_path


def a_star_algorithm(board: Board):
    start, end = board.find_start_end()
    heuristic = lambda node: manhattan_distance(node, end)

    distances = {(i, j): float('infinity') for i in range(len(board.board)) for j in range(len(board.board[0]))}
    distances[(start['y'], start['x'])] = 0

    priority_queue = [(heuristic(start), 0, 0, start)]
    parents = {}
    visited = []
    path_found = False
    sequence_number = itertools.count()

    while priority_queue:
        _, _, current_cost, current_node = heapq.heappop(priority_queue)
        cx, cy = current_node['x'], current_node['y']

        if current_node not in visited:
            visited.append(current_node)

        if current_node == end:
            path_found = True
            break

        for dy, dx in [(0, -1), (1, 0), (0, 1), (-1, 0)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= ny < len(board.board) and 0 <= nx < len(board.board[0]):
                neighbor_node = board.board[ny][nx]
                if neighbor_node['type'] != 1:  # Skip walls
                    new_cost = current_cost + neighbor_node['weight']
                    if new_cost < distances[(ny, nx)]:
                        distances[(ny, nx)] = new_cost
                        total_cost = new_cost + heuristic({'x': nx, 'y': ny})
                        heapq.heappush(priority_queue,
                                       (total_cost, next(sequence_number), new_cost, {'x': nx, 'y': ny}))
                        parents[(nx, ny)] = current_node

    if not path_found:
        return None, None

    shortest_path = []
    current = end
    while current != start:
        shortest_path.append(current)
        current = parents.get((current['x'], current['y']), start)
    shortest_path.append(start)
    shortest_path.reverse()

    return visited, shortest_path


def djikstras_algorithm(board: Board):
    start, end = board.find_start_end()

    distances = {(i, j): float('infinity') for i in range(len(board.board)) for j in range(len(board.board[0]))}
    distances[(start['y'], start['x'])] = 0
    node_map = {(i, j): {"x": j, "y": i} for i in range(len(board.board)) for j in range(len(board.board[0]))}

    priority_queue = [(0, (start['y'], start['x']))]
    parents = {}
    visited = []
    path_found = False

    while priority_queue:
        current_distance, (cy, cx) = heapq.heappop(priority_queue)
        current_node = node_map[(cy, cx)]

        if current_node not in visited:
            visited.append(current_node)

        if current_node == end:
            path_found = True
            break

        for dy, dx in [(0, -1), (1, 0), (0, 1), (-1, 0)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= ny < len(board.board) and 0 <= nx < len(board.board[0]):
                neighbor_node = board.board[ny][nx]
                if neighbor_node['type'] != 1:
                    new_distance = current_distance + neighbor_node['weight']
                    if new_distance < distances[(ny, nx)]:
                        distances[(ny, nx)] = new_distance
                        heapq.heappush(priority_queue, (new_distance, (ny, nx)))
                        parents[(nx, ny)] = current_node

    if not path_found:
        return None, None

    shortest_path = []
    current = end
    while current != start:
        shortest_path.append(current)
        current = parents.get((current['x'], current['y']), start)
    shortest_path.append(start)
    shortest_path.reverse()

    return visited, shortest_path


def dfs_algorithm(board: Board):
    start, end = board.find_start_end()
    visited = []
    visited_set = set()
    stack = [(start, None)]
    parents = {}

    while stack:
        node, parent = stack.pop()
        visited.append(node)
        visited_set.add((node["x"], node["y"]))

        x, y = node.get("x"), node.get("y")
        parents[(x, y)] = parent

        if node == end:
            shortest_path = []
            current = node
            while current is not None:
                x, y = current.get("x"), current.get("y")
                shortest_path.append(current)
                current = parents.get((x, y))
            shortest_path.reverse()
            return visited, shortest_path

        for dy, dx in [(0, -1), (1, 0), (0, 1), (-1, 0)]:
            nx, ny = x + dx, y + dy
            if 0 <= ny < len(board.board) and 0 <= nx < len(board.board[0]):
                neighbor_node = board.board[ny][nx]
                if neighbor_node['type'] in [0, 3] and (nx, ny) not in visited_set:
                    stack.append(({"x": nx, "y": ny}, node))
                    visited_set.add((nx, ny))

    return None, None


def bfs_algorithm(board: Board):
    start, end = board.find_start_end()
    visited = []
    visited_set = set()
    queue = deque([(start, None)])
    parents = {}

    while queue:
        node, parent = queue.popleft()
        visited.append(node)
        visited_set.add((node["x"], node["y"]))

        x, y = node.get("x"), node.get("y")
        parents[(x, y)] = parent

        if node == end:
            shortest_path = []
            current = node
            while current is not None:
                x, y = current.get("x"), current.get("y")
                shortest_path.append(current)
                current = parents.get((x, y))
            shortest_path.reverse()
            return visited, shortest_path

        for dy, dx in [(0, -1), (1, 0), (0, 1), (-1, 0)]:
            nx, ny = x + dx, y + dy
            if 0 <= ny < len(board.board) and 0 <= nx < len(board.board[0]):
                next_node = board.board[ny][nx]
                if (next_node['type'] in [0, 3]) and (nx, ny) not in visited_set:
                    queue.append(({"x": nx, "y": ny}, node))
                    visited_set.add((nx, ny))

    return None, None
