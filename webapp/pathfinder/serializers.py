from rest_framework import serializers

from pathfinder.models import Board


class BoardSerializer(serializers.Serializer):
    board = serializers.ListField(
        child=serializers.ListField(
            child=serializers.IntegerField()
        )
    )
    algorithm = serializers.CharField(max_length=200)

    def create(self, validated_data):
        return Board(**validated_data)

    def update(self, instance, validated_data):
        instance.board = validated_data.get('board', instance.board)
        instance.algorithm = validated_data.get('algorithm', instance.algorithm)
        return instance
