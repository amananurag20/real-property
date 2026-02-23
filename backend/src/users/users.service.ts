import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { PrismaService } from '@prisma';
import { REDIS_CLIENT } from '@redis';
import { UpdateProfileDto } from '@users/dto/update-profile.dto';
import { getUserSelect } from '@common';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
        @Inject(REDIS_CLIENT) private readonly redis: Redis,
    ) { }

    /** Get own profile — role-aware field selection */
    async findMe(userId: string, requesterRole: string) {
        const select = getUserSelect(requesterRole);
        const user = await this.prisma.client.user.findUnique({
            where: { id: userId },
            select,
        });
        if (!user) throw new NotFoundException('User not found.');
        return user;
    }

    /** Update own profile */
    async updateMe(userId: string, dto: UpdateProfileDto) {
        return this.prisma.client.user.update({
            where: { id: userId },
            data: dto,
        });
    }

    /** [ADMIN] List all users */
    async findAll() {
        const select = getUserSelect('ADMIN');
        return this.prisma.client.user.findMany({
            orderBy: { createdAt: 'desc' },
            select,
        });
    }

    /** [ADMIN] Get a single user by id */
    async findOne(targetId: string) {
        const select = getUserSelect('ADMIN');
        const user = await this.prisma.client.user.findUnique({
            where: { id: targetId },
            select,
        });
        if (!user) throw new NotFoundException('User not found.');
        return user;
    }

    /** [ADMIN] Suspend / unsuspend a user */
    async setSuspended(targetId: string, suspended: boolean) {
        const user = await this.prisma.client.user.findUnique({ where: { id: targetId } });
        if (!user) throw new NotFoundException('User not found.');

        const updated = await this.prisma.client.user.update({
            where: { id: targetId },
            data: { isSuspended: suspended },
        });

        if (suspended) {
            const nowSeconds = Math.floor(Date.now() / 1000);
            await this.redis.set(
                `invalidated_before:${targetId}`,
                String(nowSeconds),
                'EX',
                60 * 16,
            );
            await this.redis.del(`refresh:${targetId}`);
        }

        return updated;
    }
}
