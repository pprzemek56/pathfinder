class Board:
    def __init__(self, board, algorithm):
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
                if self.board[i][j] == 2:
                    start = {"x": j, "y": i}
                elif self.board[i][j] == 3:
                    end = {"x": j, "y": i}

                if start and end:
                    return start, end


if __name__ == "__main__":
    pass
