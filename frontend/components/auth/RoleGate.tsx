'use client';

import React, { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface RoleGateProps {
  children: ReactNode;
  requiredRoles: string | string[];
  fallback?: ReactNode;
}

export const RoleGate: React.FC<RoleGateProps> = ({ children, requiredRoles, fallback }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return fallback || null;
  }

  if (!user) {
    return fallback || null;
  }

  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  const hasRole = roles.includes(user.role);

  if (!hasRole) {
    return fallback || null;
  }

  return <>{children}</>;
};
