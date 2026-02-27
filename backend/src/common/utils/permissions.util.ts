import {
  PermissionKey,
  ROLE_PERMISSIONS,
  AGENT_PROFILE_PERMISSIONS,
  SERVICE_PROVIDER_PROFILE_PERMISSIONS,
} from '../constants/permissions.constant';
import { Role, ApprovalStatus } from '../../../generated/prisma/enums';

interface UserWithProfiles {
  role: Role;
  agentProfile?: { approvalStatus: ApprovalStatus } | null;
  serviceProviderProfile?: { approvalStatus: ApprovalStatus } | null;
}

/**
 * Compute effective permissions for a user based on their role
 * AND any active (approved) profiles they hold.
 */
export function getUserEffectivePermissions(
  user: UserWithProfiles,
): PermissionKey[] {
  const base = [...(ROLE_PERMISSIONS[user.role] ?? ROLE_PERMISSIONS[Role.USER])];

  if (user.agentProfile?.approvalStatus === ApprovalStatus.APPROVED) {
    base.push(...AGENT_PROFILE_PERMISSIONS);
  }

  if (user.serviceProviderProfile?.approvalStatus === ApprovalStatus.APPROVED) {
    base.push(...SERVICE_PROVIDER_PROFILE_PERMISSIONS);
  }

  return [...new Set(base)];
}
