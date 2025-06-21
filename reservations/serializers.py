from rest_framework import serializers
from .models import Room, Reservation

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    room = serializers.PrimaryKeyRelatedField(queryset=Room.objects.all())  # allow ID input

    class Meta:
        model = Reservation
        fields = '__all__'
        read_only_fields = ['user']
def perform_create(self, serializer):
    serializer.save(user=self.request.user)  # ✅ this is perfect
