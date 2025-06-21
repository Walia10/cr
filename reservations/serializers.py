from rest_framework import serializers
from .models import Room, Reservation

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    room_id = serializers.PrimaryKeyRelatedField(
        queryset=Room.objects.all(),
        source='room'
    )
    room = RoomSerializer(read_only=True)

    class Meta:
        model = Reservation
        fields = ['id', 'room', 'room_id', 'date', 'start_time', 'end_time', 'user']
        read_only_fields = ['user']
