import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { memoryCache } from '../../common/utils/memory-cache.util';

export interface JwtPayload {
  sub: string;
  role: string;
  iat: number; // issued-at (Unix seconds) — included by default by @nestjs/jwt
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('JWT_ACCESS_SECRET'),
    });
  }

  /**
   * Called after the token signature is verified.
   * Checks Redis for an invalidation timestamp — rejects the token if it was
   * issued before the stored `invalidated_before:<userId>` value.
   * This makes logout and account suspension take effect immediately.
   */
  async validate(payload: JwtPayload) {
    const invalidatedAt = await memoryCache.get(
      `invalidated_before:${payload.sub}`,
    );

    if (invalidatedAt && payload.iat <= parseInt(invalidatedAt, 10)) {
      throw new UnauthorizedException(
        'Token has been invalidated. Please log in again.',
      );
    }

    return { id: payload.sub, role: payload.role };
  }
}
