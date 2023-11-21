from rest_framework import serializers

from pathfinder.models import Board
from pathfinder.models import Path


class PathSerializer(serializers.Serializer):
    visited = serializers.ListField(child=serializers.DictField())
    shortest_path = serializers.ListField(child=serializers.DictField())

    def create(self, validated_data):
        return Path(**validated_data)

    def update(self, instance, validated_data):
        instance.visited = validated_data.get("visited")
        instance.shortest_path = validated_data.get("shortest_path")
        return instance


class BoardSerializer(serializers.Serializer):
    board = serializers.ListField(
        child=serializers.ListField(
            child=serializers.DictField()
        )
    )
    algorithm = serializers.CharField(max_length=200)

    def create(self, validated_data):
        return Board(**validated_data)

    def update(self, instance, validated_data):
        instance.board = validated_data.get('board', instance.board)
        instance.algorithm = validated_data.get('algorithm', instance.algorithm)
        return instance
