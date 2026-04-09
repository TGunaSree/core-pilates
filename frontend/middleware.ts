import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This middleware automatically intercepts any request hitting a secure route
export function middleware(request: NextRequest) {
  // Extract token from cookies
  const token = request.cookies.get('auth_token')?.value

  // Verify internal API proxy requests
  if (request.nextUrl.pathname.startsWith('/api/secure')) {
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized: You must be logged in to reserve.' }, 
        { status: 401 }
      )
    }
  }

  // Verify direct page visits (e.g. if we create a profile dashboard later)
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

// Map the specific URL paths the middleware will actively scan
export const config = {
  matcher: ['/api/secure/:path*', '/dashboard/:path*'],
}
