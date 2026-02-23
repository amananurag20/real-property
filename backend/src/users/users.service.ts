import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    /** Get own profile */
    async findMe(userId: string) {
        const user = await this.prisma.client.user.findUnique({
            where: { id: userId },
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
        return this.prisma.client.user.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    /** [ADMIN] Suspend / unsuspend a user */
    async setSuspended(targetId: string, suspended: boolean) {
        const user = await this.prisma.client.user.findUnique({ where: { id: targetId } });
        if (!user) throw new NotFoundException('User not found.');

        return this.prisma.client.user.update({
            where: { id: targetId },
            data: { isSuspended: suspended },
        });
    }
}
