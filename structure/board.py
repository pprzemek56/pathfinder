import json
from field import Field


def generate_board():
    with open("board.json") as file:
        board = json.load(file)
        return Board(board["start"], board["end"], board["walls"])


def init_point(json_point):
    new_field = Field(json_point["x"], json_point["y"])
    return new_field


class Board:
    def __init__(self, start, end, walls):
        self.start = init_point(start)
        self.end = init_point(end)
        self.walls = {"x": [], "y": []}
        self.visited = {"x": [], "y": []}

        self.init_walls_visited(walls)

    def __str__(self) -> str:
        message = f"start: {self.start},\nend: {self.end},\n"
        message += f"walls: {self.walls}\n"
        message += f"visited fields: {self.visited}\n"
        return message

    @property
    def start(self):
        return self._start

    @start.setter
    def start(self, start):
        self._start = start

    @property
    def end(self):
        return self._end

    @end.setter
    def end(self, end):
        self._end = end

    @property
    def walls(self):
        return self._walls

    @walls.setter
    def walls(self, walls):
        self._walls = walls

    @property
    def visited(self):
        return self._visited

    @visited.setter
    def visited(self, visited):
        self._visited = visited

    def init_walls_visited(self, walls):
        # init visited fields
        self.visited["x"].append(self.start.x)
        self.visited["y"].append(self.start.y)

        # init walls
        for wall in walls:
            self.walls["x"].append(wall["x"])
            self.walls["y"].append(wall["y"])


if __name__ == "__main__":
    pass
