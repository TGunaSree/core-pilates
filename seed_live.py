import requests

API_URL = "https://core-pilates-api.onrender.com/api"

print("Seeding Live Production Database...")

# 1. Create Instructor
try:
    res = requests.post(f"{API_URL}/instructors/", json={
        "name": "Sophia Laurent",
        "bio": "Master Instructor specializing in authentic alignment."
    })
    instructor_id = res.json().get('id', 1)
except Exception as e:
    print("Error creating instructor", e)
    instructor_id = 1

# 2. Add Classes
classes = [
    {
        "title": "Mat Control",
        "description": "Fundamental core activation on the mat.",
        "image_url": "/ark_barrel_pink_1775725489450.png",
        "date_time": "2024-11-20T08:00:00Z",
        "duration_minutes": 50,
        "price": "35.00",
        "instructor": instructor_id
    },
    {
        "title": "Pilates Circuit",
        "description": "High-intensity studio equipment rotation.",
        "image_url": "/circuit_pink_1775725453124.png",
        "date_time": "2024-11-20T10:00:00Z",
        "duration_minutes": 55,
        "price": "45.00",
        "instructor": instructor_id
    },
    {
        "title": "Cadillac Flow",
        "description": "Deep stretching and trapeze tower work.",
        "image_url": "/cadillac_pink_1775724343831.png",
        "date_time": "2024-11-21T09:00:00Z",
        "duration_minutes": 60,
        "price": "50.00",
        "instructor": instructor_id
    },
    {
        "title": "Reformer Flow",
        "description": "Dynamic full-body workout on the reformer.",
        "image_url": "/reformer_pink_1775724328250.png",
        "date_time": "2024-11-22T08:00:00Z",
        "duration_minutes": 50,
        "price": "40.00",
        "instructor": instructor_id
    },
    {
        "title": "Stability Chair",
        "description": "Advanced balance and core stabilization.",
        "image_url": "/chair_pink_1775725525846.png",
        "date_time": "2024-11-23T07:00:00Z",
        "duration_minutes": 45,
        "price": "35.00",
        "instructor": instructor_id
    },
    {
        "title": "Tower Integration",
        "description": "Spring-loaded resistance training.",
        "image_url": "/tower_pink_1775724370756.png",
        "date_time": "2024-11-24T18:00:00Z",
        "duration_minutes": 50,
        "price": "40.00",
        "instructor": instructor_id
    },
    {
        "title": "Curated by Core",
        "description": "Signature comprehensive studio experience.",
        "image_url": "/curated_pink_1775725473044.png",
        "date_time": "2024-11-25T16:00:00Z",
        "duration_minutes": 75,
        "price": "60.00",
        "instructor": instructor_id
    }
]

for c in classes:
    r = requests.post(f"{API_URL}/classes/", json=c)
    print(r.status_code, r.json())

print("Finished seeding classes!")
