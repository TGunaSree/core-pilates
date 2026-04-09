from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InstructorViewSet, PilatesClassViewSet, BookingViewSet, ContactMessageViewSet, RegisterView

router = DefaultRouter()
router.register(r'instructors', InstructorViewSet)
router.register(r'classes', PilatesClassViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'contact', ContactMessageViewSet)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('', include(router.urls)),
]
