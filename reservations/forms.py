from django import forms
from .models import Reservation
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Room
from datetime import date


class ReservationForm(forms.ModelForm):
    class Meta:
        model = Reservation
        fields = ['date', 'start_time', 'end_time']
        widgets = {
            'date': forms.DateInput(attrs={'type': 'date'}),
            'start_time': forms.TimeInput(attrs={'type': 'time'}),
            'end_time': forms.TimeInput(attrs={'type': 'time'}),
        }

    def clean(self):
        cleaned_data = super().clean()
        date_val = cleaned_data.get('date')
        start = cleaned_data.get('start_time')
        end = cleaned_data.get('end_time')

        if date_val and date_val < date.today():
            raise forms.ValidationError("Reservation date cannot be in the past.")

        if start and end and end <= start:
            raise forms.ValidationError("End time must be after start time.")

        return cleaned_data
    def clean(self):
        cleaned_data = super().clean()
        date_val = cleaned_data.get('date')
        start = cleaned_data.get('start_time')
        end = cleaned_data.get('end_time')

        if date_val and date_val < date.today():
            raise forms.ValidationError("Reservation date cannot be in the past.")

        if start and end and end <= start:
            raise forms.ValidationError("End time must be after start time.")

        return cleaned_data


class UserRegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

class RoomForm(forms.ModelForm):
    class Meta:
        model = Room
        fields = ['name', 'location', 'capacity']

class EditReservationForm(forms.ModelForm):
    class Meta:
        model = Reservation
        fields = ['user', 'room', 'date', 'start_time', 'end_time']
        widgets = {
            'date': forms.DateInput(attrs={'type': 'date'}),
            'start_time': forms.TimeInput(attrs={'type': 'time'}),
            'end_time': forms.TimeInput(attrs={'type': 'time'}),
        }

    def clean(self):
        cleaned_data = super().clean()
        date_val = cleaned_data.get('date')
        start = cleaned_data.get('start_time')
        end = cleaned_data.get('end_time')

        if date_val and date_val < date.today():
            raise forms.ValidationError("Reservation date cannot be in the past.")

        if start and end and end <= start:
            raise forms.ValidationError("End time must be after start time.")

        return cleaned_data