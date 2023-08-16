import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || ''
  const isPublicPath = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup'

  if (isPublicPath) {
    // If it's a public path and the user is authenticated, redirect to profile
    if (token) {
      return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }
  } else {
    // If it's a private path and the user is not authenticated, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
  }
  
  // Allow the request to proceed if no redirection is needed
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
  ]
}
