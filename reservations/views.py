from datetime import datetime, timedelta
from django.conf import settings
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from .forms import ReservationForm, RoomForm, EditReservationForm
from .models import Room, Reservation
from .serializers import RoomSerializer, ReservationSerializer


@login_required
def home_redirect_view(request):
    return redirect('admin_dashboard' if request.user.is_superuser else 'home')

def home(request):
    rooms = Room.objects.all()
    return render(request, 'reservations/home.html', {'rooms': rooms})

@login_required
def available_rooms(request):
    rooms = Room.objects.all()
    return render(request, 'reservations/available_rooms.html', {'rooms': rooms})

@login_required
def confirm_booking(request, room_id):
    room = get_object_or_404(Room, id=room_id)
    success_message = None
    error_message = None

    if request.method == 'POST':
        form = ReservationForm(request.POST)
        if form.is_valid():
            date = form.cleaned_data['date']
            start = form.cleaned_data['start_time']
            end = form.cleaned_data['end_time']

            conflict = Reservation.objects.filter(
                date=date,
                start_time__lt=end,
                end_time__gt=start
            ).exists()

            if conflict:
                error_message = "This room is already booked at the selected time."
            else:
                Reservation.objects.create(
                    user=request.user,
                    room=room,
                    date=date,
                    start_time=start,
                    end_time=end
                )
                send_mail(
                    subject='Booking Confirmation',
                    message=f'Hi {request.user.username},\n\nYour reservation for room "{room.name}" on {date} from {start} to {end} has been confirmed.',
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[request.user.email],
                    fail_silently=True
                )
                success_message = "Booking confirmed! A confirmation email has been sent."
    else:
        form = ReservationForm()

    return render(request, 'reservations/confirm_booking.html', {
        'form': form, 'room': room,
        'success_message': success_message,
        'error_message': error_message
    })

@login_required
def my_reservations(request):
    reservations = Reservation.objects.filter(user=request.user).order_by('-date')
    return render(request, 'reservations/my_reservations.html', {'reservations': reservations})

def edit_reservation(request, reservation_id):
    reservation = get_object_or_404(Reservation, id=reservation_id)

    if request.method == 'POST':
        form = EditReservationForm(request.POST, instance=reservation)
        if form.is_valid():
            new_date = form.cleaned_data['date']
            new_time = form.cleaned_data['time']
            reservation.date = new_date
            reservation.start_time = new_time
            reservation.end_time = (datetime.combine(new_date, new_time) + timedelta(hours=1)).time()
            reservation.save()
            return redirect('my_reservations')
    else:
        form = EditReservationForm(instance=reservation)

    return render(request, 'reservations/edit_reservation.html', {'form': form, 'reservation': reservation})

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    password1 = request.data.get('password1')
    password2 = request.data.get('password2')

    if not username or not password1 or not password2:
        return Response({'error': 'All fields are required.'}, status=400)
    if password1 != password2:
        return Response({'error': 'Passwords do not match.'}, status=400)
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists.'}, status=400)

    user = User.objects.create_user(username=username, password=password1)
    token, _ = Token.objects.get_or_create(user=user)

    return Response({
        'message': 'User created successfully.',
        'token': token.key,
        'username': user.username
    }, status=201)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password required.'}, status=400)

    user = authenticate(username=username, password=password)

    if not user:
        return Response({'error': 'Invalid credentials.'}, status=401)

    token, _ = Token.objects.get_or_create(user=user)

    return Response({
        'token': token.key,
        'username': user.username,
        'role': 'admin' if user.is_superuser else 'user'
    }, status=200)

@api_view(['GET'])
@permission_classes([AllowAny])
def api_room_list(request):
    rooms = Room.objects.all()
    serializer = RoomSerializer(rooms, many=True)
    return Response(serializer.data)


def admin_required(view_func):
    return user_passes_test(lambda u: u.is_staff and u.is_superuser)(view_func)

@admin_required
def admin_dashboard(request):
    return render(request, 'reservations/dashboard.html')

def admin_logout(request):
    logout(request)
    return redirect('login')

@admin_required
def manage_rooms(request):
    rooms = Room.objects.all()
    return render(request, 'reservations/rooms.html', {'rooms': rooms})

@admin_required
def add_room(request):
    if request.method == 'POST':
        form = RoomForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('manage_rooms')
    else:
        form = RoomForm()
    return render(request, 'reservations/add_room.html', {'form': form})

@admin_required
def edit_room(request, room_id):
    room = get_object_or_404(Room, id=room_id)
    if request.method == 'POST':
        form = RoomForm(request.POST, instance=room)
        if form.is_valid():
            form.save()
            return redirect('manage_rooms')
    else:
        form = RoomForm(instance=room)
    return render(request, 'reservations/edit_room.html', {'form': form, 'room': room})

@admin_required
def delete_room(request, room_id):
    room = get_object_or_404(Room, id=room_id)
    room.delete()
    return redirect('manage_rooms')

@admin_required
def manage_users(request):
    users = User.objects.all()
    return render(request, 'reservations/users.html', {'users': users})

@admin_required
def edit_user(request, user_id):
    user = get_object_or_404(User, id=user_id)
    if request.method == 'POST':
        new_username = request.POST['username']
        if user == request.user and new_username.strip() == "":
            messages.error(request, "You cannot blank your own username.")
            return redirect('manage_users')
        user.username = new_username
        user.save()
        messages.success(request, f"Username updated to '{new_username}'.")
        return redirect('manage_users')
    return render(request, 'reservations/edit_user.html', {'user': user})

@admin_required
def delete_user(request, user_id):
    user = get_object_or_404(User, id=user_id)
    if user == request.user:
        messages.error(request, "You cannot delete your own account while logged in.")
        return redirect('manage_users')
    if request.method == 'POST':
        user.delete()
        messages.success(request, f"User '{user.username}' was deleted.")
        return redirect('manage_users')
    return render(request, 'reservations/confirm_delete_user.html', {'user': user})

@admin_required
def admin_manage_reservations(request):
    reservations = Reservation.objects.select_related('room', 'user').order_by('-date', '-start_time')
    return render(request, 'reservations/admin_manage_reservations.html', {'reservations': reservations})

@admin_required
def edit_reservation_admin(request, reservation_id):
    reservation = get_object_or_404(Reservation, id=reservation_id)
    if request.method == 'POST':
        form = EditReservationForm(request.POST, instance=reservation)
        if form.is_valid():
            form.save()
            messages.success(request, 'Reservation updated successfully.')
            return redirect('admin_manage_reservations')
    else:
        form = EditReservationForm(instance=reservation)
    return render(request, 'reservations/edit_reservations_admin.html', {'form': form})

@admin_required
def delete_reservation_admin(request, reservation_id):
    reservation = get_object_or_404(Reservation, id=reservation_id)
    if request.method == 'POST':
        reservation.delete()
        messages.success(request, 'Reservation deleted successfully.')
        return redirect('admin_manage_reservations')
    return render(request, 'reservations/confirm_delete_user.html', {'object': reservation, 'type': 'reservation'})

# ----------------- API: Reservation ViewSet -----------------

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='my-reservations')
    def my_reservations(self, request):
        user = request.user
        reservations = Reservation.objects.filter(user=user)
        serializer = self.get_serializer(reservations, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
