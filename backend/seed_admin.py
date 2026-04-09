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
            {"title": "Mat Control", "description": "Fundamental core activation on the mat.", "image_url": "/ark_barrel_pink_1775725489450.png", "date_time": base_time, "duration_minutes": 50, "price": "35.00", "capacity": 10, "instructor": instructor},
            {"title": "Pilates Circuit", "description": "High-intensity studio equipment rotation.", "image_url": "/circuit_pink_1775725453124.png", "date_time": base_time + timedelta(hours=2), "duration_minutes": 55, "price": "45.00", "capacity": 10, "instructor": instructor},
            {"title": "Cadillac Flow", "description": "Deep stretching and trapeze tower work.", "image_url": "/cadillac_pink_1775724343831.png", "date_time": base_time + timedelta(days=1), "duration_minutes": 60, "price": "50.00", "capacity": 10, "instructor": instructor},
            {"title": "Reformer Flow", "description": "Dynamic full-body workout on the reformer.", "image_url": "/reformer_pink_1775724328250.png", "date_time": base_time + timedelta(days=2), "duration_minutes": 50, "price": "40.00", "capacity": 10, "instructor": instructor},
            {"title": "Stability Chair", "description": "Advanced balance and core stabilization.", "image_url": "/chair_pink_1775725525846.png", "date_time": base_time + timedelta(days=3), "duration_minutes": 45, "price": "35.00", "capacity": 10, "instructor": instructor},
            {"title": "Tower Integration", "description": "Spring-loaded resistance training.", "image_url": "/tower_pink_1775724370756.png", "date_time": base_time + timedelta(days=4), "duration_minutes": 50, "price": "40.00", "capacity": 10, "instructor": instructor},
            {"title": "Curated by Core", "description": "Signature comprehensive studio experience.", "image_url": "/curated_pink_1775725473044.png", "date_time": base_time + timedelta(days=5), "duration_minutes": 75, "price": "60.00", " capacity": 10, "instructor": instructor}
        ]
        
        for c in classes:
            PilatesClass.objects.create(**c)
        print("Successfully seeded 7 core classes into Render!")
except Exception as e:
    print(f"Error seeding classes: {e}")
