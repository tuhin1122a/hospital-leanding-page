import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value
  const { pathname } = request.nextUrl

  // Ensure token has a real value, not just an empty string
  const hasAccessToken = token && token.length > 1

  // 1. If trying to access dashboard but no token, go to login
  if (pathname.startsWith('/dashboard') && !hasAccessToken) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Add no-store headers to prevent caching dashboard when logged out
  const response = NextResponse.next()
  if (pathname.startsWith('/dashboard')) {
    response.headers.set('Cache-Control', 'no-store, max-age=0')
  }
  return response
}

// Config to specify which paths this middleware should run on
export const config = {
  matcher: [
    '/dashboard', 
    '/dashboard/:path*', 
    '/login'
  ],
}
