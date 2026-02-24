import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Basic middleware to handle route protection and redirection.
 * Note: Next.js middleware runs on the edge, so we can't access localStorage here.
 * This is a pattern for where auth logic should live.
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Define auth routes (should not be accessible if logged in)
    const isAuthRoute = pathname.startsWith('/signin') || pathname.startsWith('/signup');

    // In a real app, check for a session cookie
    const hasToken = request.cookies.get('token');

    // Redirect if trying to access protected route without token
    // (Disabled for this demo since we are using client-side check in layout as well)
    /*
    if (isProtectedRoute && !hasToken) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
    */

    // Redirect if trying to access auth routes with token
    if (isAuthRoute && hasToken) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
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
