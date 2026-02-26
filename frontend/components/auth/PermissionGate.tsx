'use client';

import React, { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { hasPermission } from '@/constants/permissions';

interface PermissionGateProps {
  children: ReactNode;
  permissions: string | string[];
  requireAll?: boolean;
  fallback?: ReactNode;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  children,
  permissions,
  requireAll = false,
  fallback,
}) => {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return fallback || null;
  }

  const role = user?.role || 'CLIENT'; // Default fallback
  const perms = Array.isArray(permissions) ? permissions : [permissions];

  let hasAccess = false;
  if (Array.isArray(permissions) && permissions.length > 0) {
    hasAccess = requireAll
      ? perms.every(p => hasPermission(role, p))
      : perms.some(p => hasPermission(role, p));
  } else if (typeof permissions === 'string') {
    hasAccess = hasPermission(role, permissions);
  }

  if (!hasAccess) {
    return fallback || null;
  }

  return <>{children}</>;
};
