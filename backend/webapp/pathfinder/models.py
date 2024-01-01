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


class Board:
    def __init__(self, nodes, algorithm):
        self.nodes = nodes
        self.algorithm = algorithm

    def __str__(self):
        return f"algorithm: {self.algorithm}"

    @property
    def nodes(self):
        return self._nodes

    @nodes.setter
    def nodes(self, nodes):
        self._nodes = nodes

    @property
    def algorithm(self):
        return self._algorithm

    @algorithm.setter
    def algorithm(self, algorithm):
        self._algorithm = algorithm

    def find_start_end(self):
        start, end = None, None
        for node in self.nodes:
            if node.node_type == 2:
                start = node
            if node.node_type == 3:
                end = node
            if start and end:
                return start, end
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
