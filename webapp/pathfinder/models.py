class Board:
    def __init__(self, board, algorithm):
        self.board = board
        self.algorithm = algorithm

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


if __name__ == "__main__":
    pass

