from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from . import views
from .views import ReservationViewSet

router = DefaultRouter()
router.register(r'reservations', ReservationViewSet, basename='reservation')



urlpatterns = [
    path('', include(router.urls)),

    path('', views.home, name='home'),
    path('available_rooms/', views.available_rooms, name='available_rooms'),
    path('confirm_booking/<int:room_id>/', views.confirm_booking, name='confirm_booking'),
    path('my_reservations/', views.my_reservations, name='my_reservations'),

    # User auth
    path('register/', views.register, name='register'),
    path('api/login/', views.login_view, name='api_login'),
    path('accounts/login/', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('accounts/logout/', auth_views.LogoutView.as_view(next_page='/'), name='logout'),

    # Admin views
    path('adminpanel/', views.admin_dashboard, name='admin_dashboard'),
    path('adminpanel/rooms/', views.manage_rooms, name='manage_rooms'),
    path('adminpanel/rooms/add/', views.add_room, name='add_room'),
    path('adminpanel/rooms/edit/<int:room_id>/', views.edit_room, name='edit_room'),
    path('adminpanel/rooms/delete/<int:room_id>/', views.delete_room, name='delete_room'),
    path('adminpanel/users/', views.manage_users, name='manage_users'),
    path('adminpanel/users/edit/<int:user_id>/', views.edit_user, name='edit_user'),
    path('adminpanel/users/delete/<int:user_id>/', views.delete_user, name='delete_user'),
    path('adminpanel/reservations/', views.admin_manage_reservations, name='admin_manage_reservations'),
    path('adminpanel/reservations/edit/<int:reservation_id>/', views.edit_reservation_admin, name='edit_reservation_admin'),
    path('adminpanel/reservations/delete/<int:reservation_id>/', views.delete_reservation_admin, name='delete_reservation_admin'),

    # Dashboards
    path('dashboard/', views.home_redirect_view, name='dashboard'),
    path('admin-dashboard/', login_required(TemplateView.as_view(template_name="reservations/admin_dashboard.html")), name='admin-dashboard'),
    path('user-dashboard/', login_required(TemplateView.as_view(template_name="reservations/user_dashboard.html")), name='user-dashboard'),

    # Reservation editing
    path('edit/<int:reservation_id>/', views.edit_reservation, name='edit_reservation'),

    # API
    path('api/rooms/', views.api_room_list, name='api_room_list'),
    path('api/', include(router.urls)),  # Registers /api/reservations/
]
