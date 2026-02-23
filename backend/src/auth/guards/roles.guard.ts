import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

// Re-declare the Role enum here so we don't depend on generated Prisma types
// (generated types are only available after `prisma generate` is run)
export enum Role {
    VISITOR = 'VISITOR',
    USER = 'USER',
    AGENT = 'AGENT',
    SERVICE_PROVIDER = 'SERVICE_PROVIDER',
    ADMIN = 'ADMIN',
}

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // No @Roles() decorator — role-agnostic (still requires JwtAuthGuard)
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest<{ user?: { id: string; role: Role } }>();

        if (!user) {
            throw new ForbiddenException('No authenticated user found.');
        }

        if (!requiredRoles.includes(user.role)) {
            throw new ForbiddenException(
                `Access denied. Required role(s): ${requiredRoles.join(', ')}.`,
            );
        }

        return true;
    }
}
