'use client';

import React, { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';

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
  const { isLoading, hasPermission, hasAnyPermission, hasAllPermissions } = useAuth();

  if (isLoading) {
    return fallback || null;
  }

  const perms = Array.isArray(permissions) ? permissions : [permissions];

  let hasAccess = false;
  if (Array.isArray(permissions) && permissions.length > 0) {
    hasAccess = requireAll ? hasAllPermissions(perms) : hasAnyPermission(perms);
  } else if (typeof permissions === 'string') {
    hasAccess = hasPermission(permissions);
  }

  if (!hasAccess) {
    return fallback || null;
  }

  return <>{children}</>;
};
