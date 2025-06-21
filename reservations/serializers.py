from rest_framework import serializers
from .models import Room, Reservation  # Make sure Reservation is imported

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    room = RoomSerializer(read_only=True)  # optional: to show room details

    class Meta:
        model = Reservation
        fields = '__all__'
