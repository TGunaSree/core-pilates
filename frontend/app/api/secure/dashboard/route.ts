import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  try {
    const token = cookies().get('auth_token')?.value;

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    const [bookingsRes, contactRes] = await Promise.all([
        fetch(`${API_URL}/api/bookings/`, { 
            cache: 'no-store',
            headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_URL}/api/contact/`, { 
            cache: 'no-store',
            headers: { 'Authorization': `Bearer ${token}` }
        })
    ]);

    if (bookingsRes.status === 403 || bookingsRes.status === 401 || contactRes.status === 403) {
        return NextResponse.json({ error: 'Forbidden: Admins only' }, { status: 403 })
    }

    const bookings = await bookingsRes.json();
    const contacts = await contactRes.json();

    return NextResponse.json({ bookings, contacts })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to access internal database' }, { status: 500 })
  }
}
