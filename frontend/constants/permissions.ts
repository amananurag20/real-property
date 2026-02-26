/**
 * Permission constants for Role-Based Access Control
 * Use these constants instead of hardcoded strings
 */

// Actions
export const PERMISSIONS = {
  // Read/Browse Permissions
  BROWSE_PROPERTIES: 'browse:properties',
  BROWSE_REQUESTS: 'browse:requests',
  BROWSE_AGENTS: 'browse:agents',
  BROWSE_SERVICES: 'browse:services',
  VIEW_MAP: 'view:map',
  VIEW_PROPERTY_DETAIL: 'view:property:detail',
  VIEW_REQUEST_DETAIL: 'view:request:detail',
  VIEW_AGENT_PROFILE: 'view:agent:profile',
  VIEW_SERVICE_PROFILE: 'view:service:profile',

  // Content Creation
  CREATE_PROPERTY: 'create:property',
  CREATE_REQUEST: 'create:request',
  CREATE_AGENT_PROFILE: 'create:agent:profile',
  CREATE_SERVICE_PROFILE: 'create:service:profile',

  // Content Management (Own)
  EDIT_OWN_PROPERTY: 'edit:own:property',
  DELETE_OWN_PROPERTY: 'delete:own:property',
  EDIT_OWN_REQUEST: 'edit:own:request',
  DELETE_OWN_REQUEST: 'delete:own:request',
  EDIT_OWN_PROFILE: 'edit:own:profile',
  EDIT_OWN_AGENT_PROFILE: 'edit:own:agent:profile',
  EDIT_OWN_SERVICE_PROFILE: 'edit:own:service:profile',

  // Triangle Connection (Agent)
  LINK_PROPERTY_REQUEST: 'link:property:request',
  VIEW_LINKS: 'view:links',
  MANAGE_LINKS: 'manage:links',
  RESPOND_TO_REQUEST: 'respond:request',

  // Admin Permissions
  MODERATE_PROPERTIES: 'moderate:properties',
  MODERATE_REQUESTS: 'moderate:requests',
  MODERATE_SERVICES: 'moderate:services',
  MANAGE_USERS: 'manage:users',
  SUSPEND_USER: 'user:suspend',
  ACTIVATE_USER: 'user:activate',
  VERIFY_AGENT: 'agent:verify',
  EDIT_ANY_CONTENT: 'edit:any:content',
  DELETE_ANY_CONTENT: 'delete:any:content',
  VIEW_ADMIN_DASHBOARD: 'view:admin:dashboard',
  VIEW_ANALYTICS: 'view:analytics',
  EXPORT_DATA: 'export:data',
  VIEW_PAYMENT_LOGS: 'view:payment:logs',
  VIEW_ADMIN_LOGS: 'view:admin:logs',

  // System
  SUBMIT_CONTACT_FORM: 'submit:contact:form',
  RECEIVE_NOTIFICATIONS: 'receive:notifications',
} as const;

// Role Definitions
export const ROLES = {
  VISITOR: 'VISITOR',
  USER: 'USER',
  AGENT: 'AGENT',
  SERVICE_PROVIDER: 'SERVICE_PROVIDER',
  OWNER: 'OWNER',
  TENANT: 'TENANT',
  ADMIN: 'ADMIN',
} as const;

// Role-Permission Mapping
export const ROLE_PERMISSIONS: Record<string, string[]> = {
  [ROLES.VISITOR]: [
    PERMISSIONS.BROWSE_PROPERTIES,
    PERMISSIONS.BROWSE_REQUESTS,
    PERMISSIONS.BROWSE_AGENTS,
    PERMISSIONS.BROWSE_SERVICES,
    PERMISSIONS.VIEW_MAP,
    PERMISSIONS.VIEW_PROPERTY_DETAIL,
    PERMISSIONS.VIEW_REQUEST_DETAIL,
    PERMISSIONS.VIEW_AGENT_PROFILE,
    PERMISSIONS.VIEW_SERVICE_PROFILE,
    PERMISSIONS.SUBMIT_CONTACT_FORM,
  ],
  [ROLES.USER]: [
    PERMISSIONS.BROWSE_PROPERTIES,
    PERMISSIONS.BROWSE_REQUESTS,
    PERMISSIONS.BROWSE_AGENTS,
    PERMISSIONS.BROWSE_SERVICES,
    PERMISSIONS.VIEW_MAP,
    PERMISSIONS.VIEW_PROPERTY_DETAIL,
    PERMISSIONS.VIEW_REQUEST_DETAIL,
    PERMISSIONS.VIEW_AGENT_PROFILE,
    PERMISSIONS.VIEW_SERVICE_PROFILE,
    PERMISSIONS.SUBMIT_CONTACT_FORM,
    PERMISSIONS.CREATE_PROPERTY,
    PERMISSIONS.CREATE_REQUEST,
    PERMISSIONS.CREATE_AGENT_PROFILE,
    PERMISSIONS.EDIT_OWN_PROPERTY,
    PERMISSIONS.DELETE_OWN_PROPERTY,
    PERMISSIONS.EDIT_OWN_REQUEST,
    PERMISSIONS.DELETE_OWN_REQUEST,
    PERMISSIONS.EDIT_OWN_PROFILE,
    PERMISSIONS.RECEIVE_NOTIFICATIONS,
  ],
  [ROLES.AGENT]: [
    PERMISSIONS.BROWSE_PROPERTIES,
    PERMISSIONS.BROWSE_REQUESTS,
    PERMISSIONS.BROWSE_AGENTS,
    PERMISSIONS.BROWSE_SERVICES,
    PERMISSIONS.VIEW_MAP,
    PERMISSIONS.VIEW_PROPERTY_DETAIL,
    PERMISSIONS.VIEW_REQUEST_DETAIL,
    PERMISSIONS.VIEW_AGENT_PROFILE,
    PERMISSIONS.VIEW_SERVICE_PROFILE,
    PERMISSIONS.SUBMIT_CONTACT_FORM,
    PERMISSIONS.CREATE_PROPERTY,
    PERMISSIONS.CREATE_REQUEST,
    PERMISSIONS.CREATE_AGENT_PROFILE,
    PERMISSIONS.EDIT_OWN_PROPERTY,
    PERMISSIONS.DELETE_OWN_PROPERTY,
    PERMISSIONS.EDIT_OWN_REQUEST,
    PERMISSIONS.DELETE_OWN_REQUEST,
    PERMISSIONS.EDIT_OWN_PROFILE,
    PERMISSIONS.RECEIVE_NOTIFICATIONS,
    PERMISSIONS.LINK_PROPERTY_REQUEST,
    PERMISSIONS.VIEW_LINKS,
    PERMISSIONS.MANAGE_LINKS,
    PERMISSIONS.RESPOND_TO_REQUEST,
    PERMISSIONS.EDIT_OWN_AGENT_PROFILE,
  ],
  [ROLES.SERVICE_PROVIDER]: [
    PERMISSIONS.BROWSE_PROPERTIES,
    PERMISSIONS.BROWSE_REQUESTS,
    PERMISSIONS.BROWSE_AGENTS,
    PERMISSIONS.BROWSE_SERVICES,
    PERMISSIONS.VIEW_MAP,
    PERMISSIONS.VIEW_PROPERTY_DETAIL,
    PERMISSIONS.VIEW_REQUEST_DETAIL,
    PERMISSIONS.VIEW_AGENT_PROFILE,
    PERMISSIONS.VIEW_SERVICE_PROFILE,
    PERMISSIONS.SUBMIT_CONTACT_FORM,
    PERMISSIONS.CREATE_REQUEST,
    PERMISSIONS.EDIT_OWN_REQUEST,
    PERMISSIONS.DELETE_OWN_REQUEST,
    PERMISSIONS.EDIT_OWN_PROFILE,
    PERMISSIONS.CREATE_SERVICE_PROFILE,
    PERMISSIONS.EDIT_OWN_SERVICE_PROFILE,
    PERMISSIONS.RECEIVE_NOTIFICATIONS,
  ],
  [ROLES.OWNER]: [
    PERMISSIONS.BROWSE_PROPERTIES,
    PERMISSIONS.BROWSE_REQUESTS,
    PERMISSIONS.BROWSE_AGENTS,
    PERMISSIONS.BROWSE_SERVICES,
    PERMISSIONS.VIEW_MAP,
    PERMISSIONS.VIEW_PROPERTY_DETAIL,
    PERMISSIONS.VIEW_REQUEST_DETAIL,
    PERMISSIONS.VIEW_AGENT_PROFILE,
    PERMISSIONS.VIEW_SERVICE_PROFILE,
    PERMISSIONS.SUBMIT_CONTACT_FORM,
    PERMISSIONS.CREATE_PROPERTY,
    PERMISSIONS.CREATE_REQUEST,
    PERMISSIONS.CREATE_AGENT_PROFILE,
    PERMISSIONS.CREATE_SERVICE_PROFILE,
    PERMISSIONS.EDIT_OWN_PROPERTY,
    PERMISSIONS.DELETE_OWN_PROPERTY,
    PERMISSIONS.EDIT_OWN_REQUEST,
    PERMISSIONS.DELETE_OWN_REQUEST,
    PERMISSIONS.EDIT_OWN_PROFILE,
    PERMISSIONS.EDIT_OWN_SERVICE_PROFILE,
    PERMISSIONS.RECEIVE_NOTIFICATIONS,
  ],
  [ROLES.TENANT]: [
    PERMISSIONS.BROWSE_PROPERTIES,
    PERMISSIONS.BROWSE_REQUESTS,
    PERMISSIONS.BROWSE_AGENTS,
    PERMISSIONS.BROWSE_SERVICES,
    PERMISSIONS.VIEW_MAP,
    PERMISSIONS.VIEW_PROPERTY_DETAIL,
    PERMISSIONS.VIEW_REQUEST_DETAIL,
    PERMISSIONS.VIEW_AGENT_PROFILE,
    PERMISSIONS.VIEW_SERVICE_PROFILE,
    PERMISSIONS.SUBMIT_CONTACT_FORM,
    PERMISSIONS.CREATE_PROPERTY,
    PERMISSIONS.CREATE_REQUEST,
    PERMISSIONS.CREATE_AGENT_PROFILE,
    PERMISSIONS.EDIT_OWN_PROPERTY,
    PERMISSIONS.DELETE_OWN_PROPERTY,
    PERMISSIONS.EDIT_OWN_REQUEST,
    PERMISSIONS.DELETE_OWN_REQUEST,
    PERMISSIONS.EDIT_OWN_PROFILE,
    PERMISSIONS.RECEIVE_NOTIFICATIONS,
  ],
  [ROLES.ADMIN]: [
    // All permissions - use spread of all values
    ...Object.values(PERMISSIONS),
  ],
};

// Route Access Configuration
export const ROUTE_ACCESS = {
  // Public routes
  PUBLIC: [
    '/',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/properties',
    '/properties/[id]',
    '/requests',
    '/requests/[id]',
    '/agents',
    '/agents/[id]',
    '/services',
    '/services/[id]',
    '/map',
    '/auth/*',
    '/signin',
    '/signup',
    '/401',
    '/403',
    '/404',
  ],

  // Requires authentication
  PROTECTED: [
    '/dashboard',
    '/dashboard/*',
    '/provider/dashboard',
    '/provider/profile/edit',
  ],

  // Role-specific routes
  AGENT_ONLY: [
    '/agent/links',
    '/agent/links/create',
    '/agent/properties',
    '/agent/requests',
  ],

  PROVIDER_ONLY: [
    '/provider/dashboard',
    '/provider/profile/edit',
  ],

  ADMIN_ONLY: [
    '/admin',
    '/admin/*',
  ],
};

// Feature Flags (Phase-based)
export const FEATURE_FLAGS = {
  PAYMENT_SYSTEM: false, // Phase 1: Backend ready only
  IN_APP_CHAT: false,    // Phase 2
  SUBSCRIPTION: false,   // Phase 2
  ESCROW: false,         // Phase 3
  INVESTMENT_MODULE: false, // Phase 3
  AI_CHATBOT: true,      // Phase 1
};

// Helper Functions
export const hasPermission = (userRole: string, permission: string): boolean => {
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes(permission);
};

export const hasAnyPermission = (userRole: string, permissions: string[]): boolean => {
  return permissions.some(p => hasPermission(userRole, p));
};

export const hasAllPermissions = (userRole: string, permissions: string[]): boolean => {
  return permissions.every(p => hasPermission(userRole, p));
};

// Type exports
export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];
export type Role = typeof ROLES[keyof typeof ROLES];
