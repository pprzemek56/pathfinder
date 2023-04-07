from .models import Board


def dfs_algorithm(board: Board):
    start, end = board.find_start_end()
    visited = set()
    stack = [start]

    while stack:
        node = stack.pop()
        visited.add(node)

        if node == end:
            return list(visited)

        x, y = node.get("x"), node.get("y")

        # find available neighbors
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < len(board)\
                    and 0 <= ny < len(board[0]) \
                    and board[nx][ny] == 0 \
                    and {"x": nx, "y": ny} not in visited:
                stack.append({"x": nx, "y": ny})

    return f"The path doesn't exist!"
