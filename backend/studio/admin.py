from django.contrib import admin
from .models import Instructor, PilatesClass, Booking

admin.site.register(Instructor)
admin.site.register(PilatesClass)
admin.site.register(Booking)
