class Field:
    def __init__(self, x, y, field_type):
        self.x = x
        self.y = y
        self.field_type = field_type

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
    def field_type(self):
        return self._field_type

    @field_type.setter
    def field_type(self, field_type):
        self._field_type = field_type
