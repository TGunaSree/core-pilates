from django.db import models

class Instructor(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField()
    photo_url = models.URLField(blank=True, null=True, help_text="Link to uploaded photo")

    def __str__(self):
        return self.name

class PilatesClass(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE, related_name='classes')
    date_time = models.DateTimeField()
    duration_minutes = models.IntegerField(default=50)
    capacity = models.IntegerField(default=10)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.title} on {self.date_time.strftime('%Y-%m-%d %H:%M')}"

class Booking(models.Model):
    customer_name = models.CharField(max_length=100)
    customer_email = models.EmailField()
    pilates_class = models.ForeignKey(PilatesClass, on_delete=models.CASCADE, related_name='bookings')
    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer_name} -> {self.pilates_class.title}"

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}"
