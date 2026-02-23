import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '@redis';

export interface JwtPayload {
    sub: string;
    role: string;
    iat: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        config: ConfigService,
        @Inject(REDIS_CLIENT) private readonly redis: Redis,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.getOrThrow<string>('JWT_ACCESS_SECRET'),
        });
    }

    async validate(payload: JwtPayload) {
        const invalidatedAt = await this.redis.get(`invalidated_before:${payload.sub}`);

        if (invalidatedAt && payload.iat <= parseInt(invalidatedAt, 10)) {
            throw new UnauthorizedException('Token has been invalidated. Please log in again.');
        }

        return { id: payload.sub, role: payload.role };
    }
}
