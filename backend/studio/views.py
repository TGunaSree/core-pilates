from rest_framework import viewsets
from .models import Instructor, PilatesClass, Booking, ContactMessage
from .serializers import InstructorSerializer, PilatesClassSerializer, BookingSerializer, ContactMessageSerializer

class InstructorViewSet(viewsets.ModelViewSet):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer

class PilatesClassViewSet(viewsets.ModelViewSet):
    queryset = PilatesClass.objects.all().order_by('date_time')
    serializer_class = PilatesClassSerializer

from rest_framework.permissions import IsAdminUser, AllowAny

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAdminUser()]

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAdminUser()]

from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
