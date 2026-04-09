import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const djangoPayload = {
        pilates_class: data.class_id,
        customer_name: data.customer_name,
        customer_email: data.customer_email
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    // Proxy the request securely to Django
    const response = await fetch(`${API_URL}/api/bookings/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(djangoPayload),
    });

    if (response.ok) {
        return NextResponse.json({ success: true, message: "Reserved" })
    } else {
        const errorData = await response.json()
        return NextResponse.json({ error: errorData }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to proxy booking' }, { status: 500 })
  }
}
