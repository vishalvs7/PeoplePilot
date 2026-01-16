import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Remove unused import
// import { auth } from '@/lib/firebase/config';
// import { getAuth } from 'firebase-admin'; // Not needed yet

const publicRoutes = ['/login', '/signup', '/forgot-password', '/'];
const authRoutes = ['/login', '/signup', '/forgot-password'];
const protectedRoutes = ['/app', '/dashboard', '/setup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the route is public
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // Get the token from cookies
  const token = request.cookies.get('session')?.value;
  
  // For now, we'll use a simple check
  // In production, verify Firebase token
  const isAuthenticated = !!token;
  
  // Redirect logic
  if (isAuthRoute && isAuthenticated) {
    // User is logged in but trying to access auth pages
    return NextResponse.redirect(new URL('/app/default/hr/dashboard', request.url));
  }
  
  if (isProtectedRoute && !isAuthenticated) {
    // User is not logged in but trying to access protected pages
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};