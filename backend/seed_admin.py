import os
import django

# Setup Django Environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core_api.settings')
django.setup()

from django.contrib.auth.models import User

try:
    if not User.objects.filter(username='gunasree').exists():
        User.objects.create_superuser('gunasree', 'admin@corepink.com', 'gunasree')
        print("Superuser 'gunasree' successfully created.")
    else:
        print("Superuser 'gunasree' already exists.")
except Exception as e:
    print(f"Error creating superuser: {e}")
