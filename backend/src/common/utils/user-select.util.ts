/**
 * Role-aware Prisma select builder for the User model.
 *
 * Usage:
 *   getUserSelect('USER')           // self-access: no id, no sensitive admin fields
 *   getUserSelect('ADMIN')          // full access: all fields including id
 *   getUserSelect('USER', { id: true }) // override: force-include a field
 */

type UserSelectMap = Record<string, boolean | Record<string, boolean>>;

// ── Field presets ────────────────────────────────────────────────────────────

/** Fields any authenticated user can see about themselves */
const USER_SELECT: UserSelectMap = {
  name: true,
  email: true,
  phone: true,
  role: true,
  avatarUrl: true,
  isActive: true,
  createdAt: true,
  // id        → hidden for self-access (prevents enumeration)
  // isSuspended → admin-only
  // updatedAt   → admin-only
};

/** Fields visible to ADMIN — full record */
const ADMIN_SELECT: UserSelectMap = {
  id: true,
  name: true,
  email: true,
  phone: true,
  role: true,
  avatarUrl: true,
  isActive: true,
  isSuspended: true,
  createdAt: true,
  updatedAt: true,
};

/** Role → default select map */
const ROLE_SELECT: Record<string, UserSelectMap> = {
  USER: USER_SELECT,
  OWNER: USER_SELECT,
  TENANT: USER_SELECT,
  AGENT: USER_SELECT,
  SERVICE_PROVIDER: USER_SELECT,
  VISITOR: USER_SELECT,
  ADMIN: ADMIN_SELECT,
};

// ── Profile summary select — used when including relations ──────────────────

export const AGENT_PROFILE_SUMMARY_SELECT = {
  id: true,
  agencyName: true,
  isVerified: true,
  approvalStatus: true,
  rating: true,
  profilePhoto: true,
};

export const SERVICE_PROVIDER_PROFILE_SUMMARY_SELECT = {
  id: true,
  type: true,
  businessName: true,
  isVerified: true,
  approvalStatus: true,
  rating: true,
  profilePhoto: true,
};

// ── Builder ──────────────────────────────────────────────────────────────────

/**
 * Returns a Prisma-compatible `select` object for the User model
 * based on the requester's role.
 *
 * @param role    - The role of the requesting user (from JWT payload)
 * @param overrides - Optional field overrides to add or suppress specific fields.
 *                   Pass `{ id: true }` to force-include id for a USER,
 *                   or `{ phone: false }` to strip a field from ADMIN output.
 *
 * @example
 *   // In a service method:
 *   const select = getUserSelect(currentUser.role);
 *   return this.prisma.client.user.findUnique({ where: { id }, select });
 *
 * @example
 *   // Admin listing with a stripped field:
 *   const select = getUserSelect('ADMIN', { updatedAt: false });
 */
export function getUserSelect(
  role: string,
  overrides?: UserSelectMap,
): UserSelectMap {
  const base = ROLE_SELECT[role] ?? USER_SELECT; // safe fallback
  if (!overrides) return base;
  return { ...base, ...overrides };
}
