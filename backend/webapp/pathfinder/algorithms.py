import heapq
from collections import deque

from .models import Board


def djikstras_algorithm(board: Board):
    start, end = board.find_start_end()

    # Initialize distances with infinity
    distances = {(i, j): float('infinity') for i in range(len(board.board)) for j in range(len(board.board[0]))}
    distances[(start['y'], start['x'])] = 0
    node_map = {(i, j): {"x": j, "y": i} for i in range(len(board.board)) for j in range(len(board.board[0]))}

    # Priority queue: (distance, (x, y))
    priority_queue = [(0, (start['y'], start['x']))]
    parents = {}
    visited = []
    path_found = False

    while priority_queue:
        current_distance, (cy, cx) = heapq.heappop(priority_queue)
        current_node = node_map[(cy, cx)]

        # Mark the node as visited
        if current_node not in visited:
            visited.append(current_node)

        # Stop if we reach the end node
        if current_node == end:
            path_found = True
            break

        # Check all neighbors
        for dy, dx in [(0, -1), (1, 0), (0, 1), (-1, 0)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= ny < len(board.board) and 0 <= nx < len(board.board[0]):
                neighbor_node = board.board[ny][nx]
                if neighbor_node['type'] != 1:  # Skip walls
                    new_distance = current_distance + neighbor_node['weight']
                    if new_distance < distances[(ny, nx)]:
                        distances[(ny, nx)] = new_distance
                        heapq.heappush(priority_queue, (new_distance, (ny, nx)))
                        parents[(nx, ny)] = current_node

    if not path_found:
        return None, None

    # Construct the shortest path
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
    stack = [(start, None)]  # store each node along with its parent in the stack
    parents = {}  # store the parent of each visited node

    while stack:
        node, parent = stack.pop()
        visited.append(node)
        visited_set.add((node["x"], node["y"]))

        # set the parent of the current node
        x, y = node.get("x"), node.get("y")
        parents[(x, y)] = parent

        if node == end:
            # retrace the path from the end node back to the start node using the parents dictionary
            shortest_path = []
            current = node
            while current is not None:
                x, y = current.get("x"), current.get("y")
                shortest_path.append(current)
                current = parents.get((x, y))
            shortest_path.reverse()  # reverse the path to get the correct order
            return visited, shortest_path

        # find available neighbors
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
    queue = deque([(start, None)])  # Use tuples for nodes
    parents = {}  # Keep track of parent nodes

    while queue:
        node, parent = queue.popleft()  # Unpack the node and its parent
        visited.append(node)
        visited_set.add((node["x"], node["y"]))

        # set the parent of the current node
        x, y = node.get("x"), node.get("y")
        parents[(x, y)] = parent

        if node == end:  # Compare tuples
            # Reconstruct the shortest path using parents dictionary
            shortest_path = []
            current = node
            while current is not None:
                x, y = current.get("x"), current.get("y")
                shortest_path.append(current)
                current = parents.get((x, y))
            shortest_path.reverse()  # Reverse the path to get the correct order
            return visited, shortest_path

        for dy, dx in [(0, -1), (1, 0), (0, 1), (-1, 0)]:
            nx, ny = x + dx, y + dy
            if 0 <= ny < len(board.board) and 0 <= nx < len(board.board[0]):
                next_node = board.board[ny][nx]
                if (next_node['type'] in [0, 3]) and (nx, ny) not in visited_set:
                    queue.append(({"x": nx, "y": ny}, node))
                    visited_set.add((nx, ny))

    return None, None
