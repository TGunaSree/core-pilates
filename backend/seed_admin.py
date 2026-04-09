import os
import django

# Setup Django Environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core_api.settings')
django.setup()

from django.contrib.auth.models import User
from studio.models import Instructor, PilatesClass
from django.utils import timezone
from datetime import timedelta

# 1. Automate Admin Account
try:
    if not User.objects.filter(username='gunasree').exists():
        User.objects.create_superuser('gunasree', 'admin@corepink.com', 'gunasree')
        print("Superuser 'gunasree' successfully created.")
except Exception as e:
    print(f"Error creating superuser: {e}")

# 2. Automate Class Population
try:
    instructor, created = Instructor.objects.get_or_create(
        name="Sophia Laurent",
        defaults={"bio": "Master Instructor specializing in authentic alignment."}
    )
    
    if PilatesClass.objects.count() == 0:
        base_time = timezone.now() + timedelta(days=1)
        classes = [
            {"title": "Mat Control", "description": "Fundamental core activation on the mat.", "date_time": base_time, "duration_minutes": 50, "price": "2900.00", "capacity": 10, "instructor": instructor},
            {"title": "Pilates Circuit", "description": "High-intensity studio equipment rotation.", "date_time": base_time + timedelta(hours=2), "duration_minutes": 55, "price": "3700.00", "capacity": 10, "instructor": instructor},
            {"title": "Cadillac Flow", "description": "Deep stretching and trapeze tower work.", "date_time": base_time + timedelta(days=1), "duration_minutes": 60, "price": "4200.00", "capacity": 10, "instructor": instructor},
            {"title": "Reformer Flow", "description": "Dynamic full-body workout on the reformer.", "date_time": base_time + timedelta(days=2), "duration_minutes": 50, "price": "3300.00", "capacity": 10, "instructor": instructor},
            {"title": "Stability Chair", "description": "Advanced balance and core stabilization.", "date_time": base_time + timedelta(days=3), "duration_minutes": 45, "price": "2900.00", "capacity": 10, "instructor": instructor},
            {"title": "Tower Integration", "description": "Spring-loaded resistance training.", "date_time": base_time + timedelta(days=4), "duration_minutes": 50, "price": "3300.00", "capacity": 10, "instructor": instructor},
            {"title": "Curated by Core", "description": "Signature comprehensive studio experience.", "date_time": base_time + timedelta(days=5), "duration_minutes": 75, "price": "5000.00", "capacity": 10, "instructor": instructor}
        ]
        
        for c in classes:
            PilatesClass.objects.create(**c)
        print("Successfully seeded 7 core classes into Render!")
except Exception as e:
    print(f"Error seeding classes: {e}")
