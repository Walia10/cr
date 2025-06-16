from django.urls import path
from .views import register, api_room_list  # import your API views

urlpatterns = [
    path('register/', register, name='api_register'),
    path('rooms/', api_room_list, name='api_rooms'),
    path('rooms/', api_room_list, name='api_rooms'),
]
