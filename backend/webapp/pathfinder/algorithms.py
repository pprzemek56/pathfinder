import heapq
import itertools
from collections import deque

from .event_emitter import emit_event
from .models import Board


def manhattan_distance(start, end):
    return abs(start['x'] - end['x']) + abs(start['y'] - end['y'])


def trace_back_path(end_node, parents, start_node):
    current = end_node
    shortest_path = [current]
    while current != start_node:
        current_x, current_y = current['x'], current['y']
        parent = parents.get((current_x, current_y))
        if parent is None:
            break
        shortest_path.append(parent)
        current = parent
    shortest_path.reverse()
    return shortest_path


def greedy_best_first_search(board: Board, debug=False):
    start, end = board.find_start_end()
    heuristic = lambda node: manhattan_distance(node, end)
    emit_event("Algorithm Initialization", "Starting Greedy Best-First Search. Initializing variables.", debug)

    visited = []
    path_found = False
    parents = {}
    sequence_number = itertools.count()
    priority_queue = [(heuristic(start), next(sequence_number), start)]

    while priority_queue:
        _, _, current_node = heapq.heappop(priority_queue)
        cx, cy = current_node['x'], current_node['y']

        if current_node not in visited:
            visited.append(current_node)
            emit_event("Node Visitation", f"Visiting node at {current_node['x']}, {current_node['y']}.", debug)

        if current_node == end:
            path_found = True
            emit_event("Path Discovery", "End node reached. Tracing back the shortest path.", debug)
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
                        emit_event("Neighbor Evaluation", f"Evaluating neighbor at {nx}, {ny}.", debug)

    if not path_found:
        emit_event("Algorithm Completion", "Algorithm completed. Path not found.", debug)
        return None, None
    
    shortest_path = trace_back_path(current_node, parents, start)
    emit_event("Algorithm Completion", "Algorithm completed. Path found.", debug)

    return visited, shortest_path


def a_star_algorithm(board: Board, debug=False):
    start, end = board.find_start_end()
    heuristic = lambda node: manhattan_distance(node, end)
    emit_event("Algorithm Initialization", "Starting A* Algorithm. Initializing variables.", debug)

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
            emit_event("Node Visitation", f"Visiting node at {current_node['x']}, {current_node['y']}.", debug)

        if current_node == end:
            path_found = True
            emit_event("Path Discovery", "End node reached. Tracing back the shortest path.", debug)
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
                        emit_event("Neighbor Evaluation", f"Evaluating neighbor at {nx}, {ny}.", debug)

    if not path_found:
        emit_event("Algorithm Completion", "Algorithm completed. Path not found.", debug)
        return None, None

    shortest_path = trace_back_path(current_node, parents, start)
    emit_event("Algorithm Completion", "Algorithm completed. Path found.", debug)

    return visited, shortest_path


def djikstras_algorithm(board: Board, debug=False):
    start, end = board.find_start_end()
    emit_event("Algorithm Initialization", "Starting Dijkstras Algorithm. Initializing variables.", debug)

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
            emit_event("Node Visitation", f"Visiting node at {current_node['x']}, {current_node['y']}.", debug)

        if current_node == end:
            path_found = True
            emit_event("Path Discovery", "End node reached. Tracing back the shortest path.", debug)
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
                        emit_event("Neighbor Evaluation", f"Evaluating neighbor at {nx}, {ny}.", debug)

    if not path_found:
        emit_event("Algorithm Completion", "Algorithm completed. Path not found.", debug)
        return None, None

    shortest_path = trace_back_path(current_node, parents, start)
    emit_event("Algorithm Completion", "Algorithm completed. Path found.", debug)

    return visited, shortest_path


def dfs_algorithm(board: Board, debug=False):
    start, end = board.find_start_end()
    emit_event("Algorithm Initialization", "Starting Depth-First Search. Initializing variables.", debug)
    visited = []
    visited_set = set()
    stack = [(start, None)]
    parents = {}

    while stack:
        node, parent = stack.pop()
        if (node["x"], node["y"]) not in visited_set:
            visited.append(node)
            visited_set.add((node["x"], node["y"]))
            emit_event("Node Visitation", f"Visiting node at {node['x']}, {node['y']}.", debug)

            if node == end:
                emit_event("Path Discovery", "End node reached. Tracing back the shortest path.", debug)
                shortest_path = trace_back_path(end, parents, start)
                emit_event("Algorithm Completion", "Algorithm completed. Path found.", debug)
                return visited, shortest_path

            for dy, dx in [(0, -1), (1, 0), (0, 1), (-1, 0)]:
                nx, ny = node["x"] + dx, node["y"] + dy
                if 0 <= ny < len(board.board) and 0 <= nx < len(board.board[0]) and board.board[ny][nx]['type'] != 1 and (nx, ny) not in visited_set:
                    stack.append(({"x": nx, "y": ny}, node))
                    parents[(nx, ny)] = node

    emit_event("Algorithm Completion", "Algorithm completed. Path not found.", debug)
    return None, None


def bfs_algorithm(board: Board, debug=False):
    start, end = board.find_start_end()
    emit_event("Algorithm Initialization", "Starting Breadth-First Search. Initializing variables.", debug)
    visited = []
    visited_set = set()
    queue = deque([(start, None)])
    parents = {}

    while queue:
        node, parent = queue.popleft()
        if (node["x"], node["y"]) not in visited_set:
            visited.append(node)
            visited_set.add((node["x"], node["y"]))
            emit_event("Node Visitation", f"Visiting node at {node['x']}, {node['y']}.", debug)

            if node == end:
                emit_event("Path Discovery", "End node reached. Tracing back the shortest path.", debug)
                shortest_path = trace_back_path(end, parents, start)
                emit_event("Algorithm Completion", "Algorithm completed. Path found.", debug)
                return visited, shortest_path

            for dy, dx in [(0, -1), (1, 0), (0, 1), (-1, 0)]:
                nx, ny = node["x"] + dx, node["y"] + dy
                if 0 <= ny < len(board.board) and 0 <= nx < len(board.board[0]) and board.board[ny][nx]['type'] != 1 and (nx, ny) not in visited_set:
                    queue.append(({"x": nx, "y": ny}, node))
                    parents[(nx, ny)] = node

    emit_event("Algorithm Completion", "Algorithm completed. Path not found.", debug)
    return None, None
