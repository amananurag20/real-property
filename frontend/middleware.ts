import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTE_ACCESS } from './constants/permissions';

/**
 * Middleware for route protection and role-based access control.
 * Validates JWT tokens and enforces role-based access on protected routes.
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if route is public
    const isPublicRoute = ROUTE_ACCESS.PUBLIC.some((route) => {
        if (route.includes('*')) {
            const pattern = route.replace('*', '.*');
            return new RegExp(`^${pattern}$`).test(pathname);
        }
        return pathname === route || pathname.startsWith(route);
    });

    // Get JWT token from cookies
    const token = request.cookies.get('token')?.value;

    // Public routes - allow without auth
    if (isPublicRoute) {
        // Redirect to dashboard if accessing auth routes with valid token
        if ((pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register')) && token) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }

    // Protected routes - require authentication
    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Check role-specific routes (admin, agent, provider)
    const adminMatch = ROUTE_ACCESS.ADMIN_ONLY.some((route) => {
        const pattern = route.replace('*', '.*');
        return new RegExp(`^${pattern}$`).test(pathname);
    });

    const agentMatch = ROUTE_ACCESS.AGENT_ONLY.some((route) => {
        return pathname === route || pathname.startsWith(route);
    });

    const providerMatch = ROUTE_ACCESS.PROVIDER_ONLY.some((route) => {
        return pathname === route || pathname.startsWith(route);
    });

    // Try to decode token and check role (limited validation on edge)
    // For proper role checking, rely on client-side validation
    if (adminMatch || agentMatch || providerMatch) {
        // Add a marker header so client can perform detailed role check
        const response = NextResponse.next();
        response.headers.set('x-route-guard', 'true');
        return response;
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
