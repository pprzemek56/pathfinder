class Board:
    def __init__(self, board: list[list[dict]]):
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
