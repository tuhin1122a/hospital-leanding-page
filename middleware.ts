import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/request'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value
  const { pathname } = request.nextUrl

  // 1. If trying to access dashboard but no token, go to login
  if (pathname.startsWith('/dashboard') && !token) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // 2. If already logged in but trying to access login page, go to dashboard
  if (pathname === '/login' && token) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// Config to specify which paths this middleware should run on
export const config = {
  matcher: [
    '/dashboard', 
    '/dashboard/:path*', 
    '/login'
  ],
}
