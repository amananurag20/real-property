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
  PROPERTY_FEATURE: 'property:feature',

  // Property Images
  PROPERTY_IMAGE_CREATE: 'property_image:create',
  PROPERTY_IMAGE_DELETE_OWN: 'property_image:delete:own',
  PROPERTY_IMAGE_DELETE_ANY: 'property_image:delete:any',

  // Requests
  REQUEST_READ: 'request:read',
  REQUEST_CREATE: 'request:create',
  REQUEST_UPDATE_OWN: 'request:update:own',
  REQUEST_UPDATE_ANY: 'request:update:any',
  REQUEST_DELETE_OWN: 'request:delete:own',
  REQUEST_DELETE_ANY: 'request:delete:any',
  REQUEST_APPROVE: 'request:approve',

  // Agent Profile
  AGENT_READ: 'agent:read',
  AGENT_CREATE: 'agent:create',
  AGENT_UPDATE_OWN: 'agent:update:own',
  AGENT_UPDATE_ANY: 'agent:update:any',
  AGENT_VERIFY: 'agent:verify',
  AGENT_DELETE_OWN: 'agent:delete:own',
  AGENT_DELETE_ANY: 'agent:delete:any',

  // Triangle / Linking
  TRIANGLE_LINK_CREATE: 'triangle:link:create',
  TRIANGLE_LINK_READ_OWN: 'triangle:link:read:own',
  TRIANGLE_LINK_READ_ANY: 'triangle:link:read:any',
  TRIANGLE_LINK_UPDATE_OWN: 'triangle:link:update:own',
  TRIANGLE_LINK_UPDATE_ANY: 'triangle:link:update:any',
  TRIANGLE_LINK_RESPOND: 'triangle:link:respond',

  // Service Providers
  SERVICE_PROVIDER_READ: 'service_provider:read',
  SERVICE_PROVIDER_CREATE: 'service_provider:create',
  SERVICE_PROVIDER_UPDATE_OWN: 'service_provider:update:own',
  SERVICE_PROVIDER_UPDATE_ANY: 'service_provider:update:any',
  SERVICE_PROVIDER_APPROVE: 'service_provider:approve',
  SERVICE_PROVIDER_DELETE_OWN: 'service_provider:delete:own',
  SERVICE_PROVIDER_DELETE_ANY: 'service_provider:delete:any',

  // Reviews
  REVIEW_READ: 'review:read',
  REVIEW_CREATE: 'review:create',
  REVIEW_UPDATE_OWN: 'review:update:own',
  REVIEW_DELETE_OWN: 'review:delete:own',
  REVIEW_DELETE_ANY: 'review:delete:any',
  REVIEW_APPROVE: 'review:approve',

  // Notifications
  NOTIFICATION_READ_OWN: 'notification:read:own',
  NOTIFICATION_READ_ANY: 'notification:read:any',
  NOTIFICATION_CREATE: 'notification:create',

  // Payments
  PAYMENT_READ_OWN: 'payment:read:own',
  PAYMENT_READ_ANY: 'payment:read:any',
  PAYMENT_CREATE: 'payment:create',

  // Contact Inquiries
  INQUIRY_READ: 'inquiry:read',
  INQUIRY_CREATE: 'inquiry:create',
  INQUIRY_RESOLVE: 'inquiry:resolve',

  // Users
  USER_READ_OWN: 'user:read:own',
  USER_READ_ANY: 'user:read:any',
  USER_UPDATE_OWN: 'user:update:own',
  USER_UPDATE_ANY: 'user:update:any',
  USER_SUSPEND: 'user:suspend',
  USER_DELETE: 'user:delete',

  // Admin
  ADMIN_DASHBOARD: 'admin:dashboard',
  ADMIN_APPROVE: 'admin:approve',
  ADMIN_EXPORT: 'admin:export',
  ADMIN_LOGS: 'admin:logs',
  ADMIN_METRICS: 'admin:metrics',
} as const;

export type PermissionKey = (typeof Permission)[keyof typeof Permission];

// ── Role → Permissions map ─────────────────────────────────────────────

const VISITOR_PERMISSIONS: PermissionKey[] = [
  Permission.PROPERTY_READ,
  Permission.REQUEST_READ,
  Permission.AGENT_READ,
  Permission.SERVICE_PROVIDER_READ,
  Permission.REVIEW_READ,
  Permission.INQUIRY_CREATE,
];

const USER_PERMISSIONS: PermissionKey[] = [
  ...VISITOR_PERMISSIONS,
  // Properties
  Permission.PROPERTY_CREATE,
  Permission.PROPERTY_UPDATE_OWN,
  Permission.PROPERTY_DELETE_OWN,
  Permission.PROPERTY_IMAGE_CREATE,
  Permission.PROPERTY_IMAGE_DELETE_OWN,
  // Requests
  Permission.REQUEST_CREATE,
  Permission.REQUEST_UPDATE_OWN,
  Permission.REQUEST_DELETE_OWN,
  // Reviews
  Permission.REVIEW_CREATE,
  Permission.REVIEW_UPDATE_OWN,
  Permission.REVIEW_DELETE_OWN,
  // Notifications
  Permission.NOTIFICATION_READ_OWN,
  // Payments
  Permission.PAYMENT_READ_OWN,
  Permission.PAYMENT_CREATE,
  // Triangle (respond to links as buyer)
  Permission.TRIANGLE_LINK_READ_OWN,
  Permission.TRIANGLE_LINK_RESPOND,
  // User profile
  Permission.USER_READ_OWN,
  Permission.USER_UPDATE_OWN,
];

// Agent permissions (extends User)
// Note: In dynamic permission system, these are added when user has AgentProfile
const AGENT_PERMISSIONS: PermissionKey[] = [
  ...USER_PERMISSIONS,
  Permission.AGENT_CREATE,
  Permission.AGENT_UPDATE_OWN,
  Permission.AGENT_DELETE_OWN,
  Permission.TRIANGLE_LINK_CREATE,
  Permission.TRIANGLE_LINK_UPDATE_OWN,
];

// Service Provider permissions (extends User)
// Note: In dynamic permission system, these are added when user has ServiceProviderProfile
const SERVICE_PROVIDER_PERMISSIONS: PermissionKey[] = [
  ...USER_PERMISSIONS,
  Permission.SERVICE_PROVIDER_CREATE,
  Permission.SERVICE_PROVIDER_UPDATE_OWN,
  Permission.SERVICE_PROVIDER_DELETE_OWN,
];

// Admin has all permissions
const ADMIN_PERMISSIONS: PermissionKey[] = Object.values(
  Permission,
) as PermissionKey[];

export const ROLE_PERMISSIONS: Record<Role, PermissionKey[]> = {
  [Role.VISITOR]: VISITOR_PERMISSIONS,
  [Role.USER]: USER_PERMISSIONS,
  [Role.OWNER]: USER_PERMISSIONS,
  [Role.TENANT]: USER_PERMISSIONS,
  [Role.AGENT]: AGENT_PERMISSIONS,
  [Role.SERVICE_PROVIDER]: SERVICE_PROVIDER_PERMISSIONS,
  [Role.ADMIN]: ADMIN_PERMISSIONS,
};

// ── Dynamic Permission Helper ──────────────────────────────────────────
// These are additional permissions granted based on user's profiles
// Used by the dynamic permission system

export const AGENT_PROFILE_PERMISSIONS: PermissionKey[] = [
  Permission.AGENT_UPDATE_OWN,
  Permission.AGENT_DELETE_OWN,
  Permission.TRIANGLE_LINK_CREATE,
  Permission.TRIANGLE_LINK_UPDATE_OWN,
];

export const SERVICE_PROVIDER_PROFILE_PERMISSIONS: PermissionKey[] = [
  Permission.SERVICE_PROVIDER_UPDATE_OWN,
  Permission.SERVICE_PROVIDER_DELETE_OWN,
];
