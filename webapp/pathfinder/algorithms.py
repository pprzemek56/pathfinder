from collections import deque

from .models import Board


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
            if 0 <= ny < len(board.board) \
                    and 0 <= nx < len(board.board[0]) \
                    and (board.board[ny][nx] == 0 or board.board[ny][nx] == 3) \
                    and (nx, ny) not in visited_set:
                stack.append(({"x": nx, "y": ny}, node))
                visited_set.add((nx, ny))

    return None, None


def bfs_algorithm(board: Board):
    start, end = board.find_start_end()
    visited = []
    visited_set = set()
    shortest_path = []
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
            if 0 <= ny < len(board.board) \
                    and 0 <= nx < len(board.board[0]) \
                    and (board.board[ny][nx] == 0 or board.board[ny][nx] == 3) \
                    and (nx, ny) not in visited_set:  # Check tuple in visited
                queue.append(({"x": nx, "y": ny}, node))  # Add the node as the parent of the new node
                visited_set.add((nx, ny))

    return None, None
