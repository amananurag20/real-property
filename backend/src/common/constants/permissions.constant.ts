import { Role } from '../../../generated/prisma/enums';

// ── All permission strings ─────────────────────────────────────────────
export const Permission = {
  // Properties
  PROPERTY_READ: 'property:read',
  PROPERTY_CREATE: 'property:create',
  PROPERTY_UPDATE_OWN: 'property:update:own',
  PROPERTY_UPDATE_ANY: 'property:update:any',
  PROPERTY_DELETE_OWN: 'property:delete:own',
  PROPERTY_DELETE_ANY: 'property:delete:any',
  PROPERTY_APPROVE: 'property:approve',

  // Requests
  REQUEST_READ: 'request:read',
  REQUEST_CREATE: 'request:create',
  REQUEST_UPDATE_OWN: 'request:update:own',
  REQUEST_UPDATE_ANY: 'request:update:any',
  REQUEST_DELETE_OWN: 'request:delete:own',
  REQUEST_DELETE_ANY: 'request:delete:any',
  REQUEST_APPROVE: 'request:approve',

  // Agent
  AGENT_READ: 'agent:read',
  AGENT_CREATE: 'agent:create',
  AGENT_UPDATE_OWN: 'agent:update:own',
  AGENT_UPDATE_ANY: 'agent:update:any',

  // Triangle / Linking
  TRIANGLE_LINK: 'triangle:link',

  // Service Providers
  SERVICE_PROVIDER_READ: 'service_provider:read',
  SERVICE_PROVIDER_CREATE: 'service_provider:create',
  SERVICE_PROVIDER_UPDATE_OWN: 'service_provider:update:own',
  SERVICE_PROVIDER_UPDATE_ANY: 'service_provider:update:any',
  SERVICE_PROVIDER_APPROVE: 'service_provider:approve',

  // Users
  USER_READ_OWN: 'user:read:own',
  USER_READ_ANY: 'user:read:any',
  USER_UPDATE_OWN: 'user:update:own',
  USER_UPDATE_ANY: 'user:update:any',
  USER_SUSPEND: 'user:suspend',

  // Admin
  ADMIN_DASHBOARD: 'admin:dashboard',
  ADMIN_APPROVE: 'admin:approve',
  ADMIN_EXPORT: 'admin:export',
  ADMIN_LOGS: 'admin:logs',
} as const;

export type PermissionKey = (typeof Permission)[keyof typeof Permission];

// ── Role → Permissions map ─────────────────────────────────────────────
const VISITOR_PERMISSIONS: PermissionKey[] = [
  Permission.PROPERTY_READ,
  Permission.REQUEST_READ,
  Permission.AGENT_READ,
  Permission.SERVICE_PROVIDER_READ,
];

const USER_PERMISSIONS: PermissionKey[] = [
  ...VISITOR_PERMISSIONS,
  Permission.PROPERTY_CREATE,
  Permission.PROPERTY_UPDATE_OWN,
  Permission.PROPERTY_DELETE_OWN,
  Permission.REQUEST_CREATE,
  Permission.REQUEST_UPDATE_OWN,
  Permission.REQUEST_DELETE_OWN,
  Permission.USER_READ_OWN,
  Permission.USER_UPDATE_OWN,
];

const AGENT_PERMISSIONS: PermissionKey[] = [
  ...USER_PERMISSIONS,
  Permission.AGENT_CREATE,
  Permission.AGENT_UPDATE_OWN,
  Permission.TRIANGLE_LINK,
];

const SERVICE_PROVIDER_PERMISSIONS: PermissionKey[] = [
  ...USER_PERMISSIONS,
  Permission.SERVICE_PROVIDER_CREATE,
  Permission.SERVICE_PROVIDER_UPDATE_OWN,
];

const ADMIN_PERMISSIONS: PermissionKey[] = Object.values(
  Permission,
) as PermissionKey[];

export const ROLE_PERMISSIONS: Record<Role, PermissionKey[]> = {
  [Role.VISITOR]: VISITOR_PERMISSIONS,
  [Role.USER]: USER_PERMISSIONS,
  [Role.AGENT]: AGENT_PERMISSIONS,
  [Role.SERVICE_PROVIDER]: SERVICE_PROVIDER_PERMISSIONS,
  [Role.ADMIN]: ADMIN_PERMISSIONS,
};
