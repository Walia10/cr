from django.contrib import admin
from .models import Room, Reservation
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

class RoomAdmin(admin.ModelAdmin):
    list_display = ['name', 'location', 'capacity']
    search_fields = ['name', 'location']

class ReservationAdmin(admin.ModelAdmin):
    list_display = ['room', 'user', 'date', 'start_time', 'end_time']
    list_filter = ['date', 'room']
    search_fields = ['room__name', 'user__username']
    autocomplete_fields = ['room', 'user']

admin.site.register(Room, RoomAdmin)
admin.site.register(Reservation, ReservationAdmin)

# Optional but helpful: manage users from admin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
