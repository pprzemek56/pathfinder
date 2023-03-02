import json
from field import Field


def generate_board():
    with open("board.json") as file:
        board = json.load(file)
        return Board(board["start"], board["end"], board["walls"])


def init_point(json_point):
    new_field = Field(json_point["x"], json_point["y"])
    print(new_field)
    return new_field


class Board:
    def __init__(self, start, end, walls):
        self.start = init_point(start),
        self.end = init_point(end),
        self.walls = [init_point(wall) for wall in walls],
        self.visited = []
        self.visited.append(self.start)

    def __str__(self) -> str:
        message = f"start: {self.start},\nend: {self.end},\nwalls:\n"
        for i, wall in enumerate(self.walls):
            message += f"{i + 1}: {wall},\n"
        message += f"visited fields:\n"
        for i, field in enumerate(self.visited):
            message += f"{i + 1}: {field},\n"
        return message


if __name__ == "__main__":
    board = generate_board()
    print(board)
