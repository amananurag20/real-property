import { Injectable, NotFoundException } from '@nestjs/common';
import { memoryCache } from '../common/utils/memory-cache.util';
import { PrismaService } from '../prisma';
import { UpdateProfileDto } from './dto/update-profile.dto';
import {
  getUserSelect,
  AGENT_PROFILE_SUMMARY_SELECT,
  SERVICE_PROVIDER_PROFILE_SUMMARY_SELECT,
} from '../common/utils/user-select.util';
import { getUserEffectivePermissions } from '../common/utils/permissions.util';
import { Role } from '../../generated/prisma/enums';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /** Get own profile — role-aware field selection with profile relations */
  async findMe(userId: string, requesterRole: string) {
    const select = getUserSelect(requesterRole);
    const user = await this.prisma.client.user.findUnique({
      where: { id: userId },
      select: {
        ...select,
        agentProfile: { select: AGENT_PROFILE_SUMMARY_SELECT },
        serviceProviderProfile: {
          select: SERVICE_PROVIDER_PROFILE_SUMMARY_SELECT,
        },
      },
    });
    if (!user) throw new NotFoundException('User not found.');

    return {
      ...user,
      permissions: getUserEffectivePermissions({
        role: user.role as Role,
        agentProfile: user.agentProfile,
        serviceProviderProfile: user.serviceProviderProfile,
      }),
    };
  }

  /** Update own profile */
  async updateMe(userId: string, dto: UpdateProfileDto) {
    return this.prisma.client.user.update({
      where: { id: userId },
      data: dto,
    });
  }

  /** [ADMIN] List all users — full field access */
  async findAll() {
    const select = getUserSelect('ADMIN');
    return this.prisma.client.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        ...select,
        agentProfile: { select: AGENT_PROFILE_SUMMARY_SELECT },
        serviceProviderProfile: {
          select: SERVICE_PROVIDER_PROFILE_SUMMARY_SELECT,
        },
      },
    });
  }

  /** [ADMIN] Get a single user by id — full field access */
  async findOne(targetId: string) {
    const select = getUserSelect('ADMIN');
    const user = await this.prisma.client.user.findUnique({
      where: { id: targetId },
      select: {
        ...select,
        agentProfile: { select: AGENT_PROFILE_SUMMARY_SELECT },
        serviceProviderProfile: {
          select: SERVICE_PROVIDER_PROFILE_SUMMARY_SELECT,
        },
      },
    });
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }

  /** [ADMIN] Suspend / unsuspend a user */
  async setSuspended(targetId: string, suspended: boolean) {
    const user = await this.prisma.client.user.findUnique({
      where: { id: targetId },
    });
    if (!user) throw new NotFoundException('User not found.');

    const updated = await this.prisma.client.user.update({
      where: { id: targetId },
      data: { isSuspended: suspended },
    });

    // When suspending, immediately invalidate all active access tokens
    if (suspended) {
      const nowSeconds = Math.floor(Date.now() / 1000);
      await memoryCache.set(
        `invalidated_before:${targetId}`,
        String(nowSeconds),
        'EX',
        60 * 16, // 16 min — covers any in-flight 15m access token
      );
      // Also revoke the refresh token so they can't re-login silently
      await memoryCache.del(`refresh:${targetId}`);
    }

    return updated;
  }
}
