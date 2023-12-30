class Board:
    def __init__(self, board: list[list[dict]], algorithm):
        self.board = board
        self.algorithm = algorithm

    def __str__(self):
        return f"algorithm: {self.algorithm}"

    @property
    def board(self):
        return self._board

    @board.setter
    def board(self, board):
        self._board = board

    @property
    def algorithm(self):
        return self._algorithm

    @algorithm.setter
    def algorithm(self, algorithm):
        self._algorithm = algorithm

    def find_start_end(self):
        start = None
        end = None
        for i in range(len(self.board)):
            for j in range(len(self.board[i])):
                if self.board[i][j]["type"] == 2:
                    start = {"x": j, "y": i}
                elif self.board[i][j]["type"] == 3:
                    end = {"x": j, "y": i}

                if start and end:
                    return start, end


class Node:
    def __int__(self, x, y, node_type, neighbors, weight=1):
        self.x = x
        self.y = y
        self.node_type = node_type
        self.neighbors = neighbors
        self.weight = weight
        self.distance = float('infinity')
        self.parent = None

    @property
    def x(self):
        return self._x

    @x.setter
    def x(self, x):
        self._x = x

    @property
    def y(self):
        return self._y

    @y.setter
    def y(self, y):
        self._y = y

    @property
    def node_type(self):
        return self._node_type

    @node_type.setter
    def node_type(self, node_type):
        self._node_type = node_type

    @property
    def neighbors(self):
        return self._neighbors

    @neighbors.setter
    def neighbors(self, neighbors):
        self._neighbors = neighbors

    @property
    def weight(self):
        return self._weight

    @weight.setter
    def weight(self, weight):
        self._weight = weight

    def is_walkable(self):
        return self.type != 1

    def reset_state(self):
        self.distance = float('infinity')
        self.parent = None


class Path:
    def __init__(self, visited, shortest_path):
        self.visited = visited
        self.shortest_path = shortest_path

    @property
    def visited(self):
        return self._visited

    @visited.setter
    def visited(self, visited):
        self._visited = visited

    @property
    def shortest_path(self):
        return self._shortest_path

    @shortest_path.setter
    def shortest_path(self, shortest_path):
        self._shortest_path = shortest_path


if __name__ == "__main__":
    pass
