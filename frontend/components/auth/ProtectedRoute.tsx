'use client';

import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
  fallback?: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
  fallback,
}) => {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (requiredRoles && user && !requiredRoles.includes(user.role)) {
      router.push('/403');
      return;
    }
  }, [isLoading, isAuthenticated, user, requiredRoles, router]);

  if (isLoading) {
    return fallback || <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return fallback || null;
  }

  if (requiredRoles && user && !requiredRoles.includes(user.role)) {
    return fallback || null;
  }

  return <>{children}</>;
};
