class Field:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self) -> str:
        return f"x = {self.x}, y = {self.y}"

    def __eq__(self, o: object) -> bool:
        if isinstance(o, Field):
            return self.x == o.x and self.y == o.y
        return False

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


if __name__ == "__main__":
    pass
