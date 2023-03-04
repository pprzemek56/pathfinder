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
        self.walls = [init_point(wall) for wall in walls]
        self.visited = []

        self.visited.append(self.start)

    def __str__(self) -> str:
        message = f"start: {self.start},\n"
        message += f"end: {self.end},\n"
        message += f"walls:\n"
        for i, wall in enumerate(self.walls):
            message += f"{i + 1}.: {wall}\n"
        message += f"visited:\n"
        for i, visit in enumerate(self.visited):
            message += f"{i + 1}.: {visit}\n"
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

    def get_available_neighbors(self, x, y):
        possible_x = [x, x + 1, x, x - 1]
        possible_y = [y - 1, y, y + 1, y]
        available_neighbors = []

        for i in range(4):
            # Check if possible neighbors' field is on the board
            if possible_x[i] < 0 or possible_x[i] > 56 or possible_y[i] < 0 or possible_y[i] > 20:
                continue

            possible_neighbor = Field(possible_x[i], possible_y[i])
            # Check if possible neighbor is not visited or is not a wall field
            if possible_neighbor not in self.walls and possible_neighbor not in self.visited:
                available_neighbors.append(possible_neighbor)

        return available_neighbors

    def add_visited_field(self, field):
        self.visited.append(field)


if __name__ == "__main__":
    pass
