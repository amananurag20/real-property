import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import Redis from 'ioredis';
import { PrismaService } from '../prisma';
import { REDIS_CLIENT } from '../redis';
import { RegisterDto } from './dto/register.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Role } from '../../generated/prisma/enums';

// ── Constants ──────────────────────────────────────────────────────────
const HARDCODED_OTP = '1234'; // Phase 1 — replace with SMS gateway in Phase 2
const OTP_TTL_SECONDS = 300; // 5 minutes
const REFRESH_TTL_SECONDS = 2592000; // 30 days

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  // ── SIGN UP: Register (step 1) ─────────────────────────────────────────
  /**
   * Validates phone is not already taken, stores pending profile data in Redis,
   * and dispatches OTP. The user record is NOT created yet — creation happens
   * in verifyOtp() once the OTP is confirmed.
   */
  async register(dto: RegisterDto): Promise<{ message: string }> {
    const existing = await this.prisma.client.user.findUnique({
      where: { phone: dto.phone },
    });

    if (existing) {
      throw new ConflictException(
        'This phone number is already registered. Please log in instead.',
      );
    }

    // Store pending registration data so verifyOtp() can create the full profile
    const pendingKey = `pending_register:${dto.phone}`;
    await this.redis.set(
      pendingKey,
      JSON.stringify({
        name: dto.name,
        email: dto.email,
        role: dto.role || Role.USER,
      }),
      'EX',
      OTP_TTL_SECONDS,
    );

    // Store OTP
    await this.redis.set(
      `otp:${dto.phone}`,
      HARDCODED_OTP,
      'EX',
      OTP_TTL_SECONDS,
    );

    // TODO Phase 2: trigger SMS provider here
    return { message: 'OTP sent. Please verify to complete registration.' };
  }

  // ── LOGIN: Send OTP (step 1) ───────────────────────────────────────────
  /**
   * Only sends OTP if the user already exists (login flow).
   * New users must use POST /auth/register instead.
   */
  async sendOtp(dto: SendOtpDto): Promise<{ message: string }> {
    const user = await this.prisma.client.user.findUnique({
      where: { phone: dto.phone },
    });

    if (!user) {
      throw new BadRequestException(
        'No account found for this phone number. Please register first.',
      );
    }

    if (user.isSuspended) {
      throw new UnauthorizedException('Your account has been suspended.');
    }

    await this.redis.set(
      `otp:${dto.phone}`,
      HARDCODED_OTP,
      'EX',
      OTP_TTL_SECONDS,
    );
    // TODO Phase 2: trigger SMS provider here
    return { message: 'OTP sent successfully.' };
  }

  // ── SHARED: Verify OTP (step 2 for both flows) ────────────────────────
  /**
   * Handles both sign-up and login:
   * - If a pending_register key exists → creates the new user profile
   * - Otherwise → finds the existing user (login)
   */
  async verifyOtp(dto: VerifyOtpDto) {
    const otpKey = `otp:${dto.phone}`;
    const stored = await this.redis.get(otpKey);

    if (!stored || stored !== dto.otp) {
      throw new BadRequestException('Invalid or expired OTP.');
    }

    // OTP consumed — delete immediately
    await this.redis.del(otpKey);

    // Check for a pending registration
    const pendingKey = `pending_register:${dto.phone}`;
    const pendingRaw = await this.redis.get(pendingKey);

    let user: { id: string; role: string; isSuspended: boolean };

    if (pendingRaw) {
      // ── SIGN UP path ──────────────────────────────────────────────────
      await this.redis.del(pendingKey);
      const { name, email, role } = JSON.parse(pendingRaw) as {
        name: string;
        email: string;
        role: Role;
      };

      user = await this.prisma.client.user.create({
        data: {
          phone: dto.phone,
          name,
          email,
          role,
        },
      });
    } else {
      // ── LOGIN path ────────────────────────────────────────────────────
      const found = await this.prisma.client.user.findUnique({
        where: { phone: dto.phone },
      });

      if (!found) {
        throw new BadRequestException(
          'No account found for this phone number. Please register first.',
        );
      }

      user = found;
    }

    if (user.isSuspended) {
      throw new UnauthorizedException('Your account has been suspended.');
    }

    const tokens = await this.generateTokens(user.id, user.role);
    return { ...tokens, user };
  }

  // ── Refresh tokens ─────────────────────────────────────────────────────
  async refresh(dto: RefreshTokenDto) {
    const keys = await this.redis.keys('refresh:*');
    let userId: string | null = null;

    for (const k of keys) {
      const val = await this.redis.get(k);
      if (val === dto.refreshToken) {
        userId = k.split(':')[1];
        await this.redis.del(k); // rotate
        break;
      }
    }

    if (!userId) {
      throw new UnauthorizedException('Invalid or expired refresh token.');
    }

    const user = await this.prisma.client.user.findUnique({
      where: { id: userId },
    });
    if (!user || user.isSuspended) {
      throw new UnauthorizedException('User not found or suspended.');
    }

    return this.generateTokens(user.id, user.role);
  }

  // ── Logout ─────────────────────────────────────────────────────────────
  async logout(userId: string): Promise<{ message: string }> {
    // Revoke refresh token
    await this.redis.del(`refresh:${userId}`);

    // Invalidate all current access tokens for this user:
    // Any token with iat <= now will be rejected by JwtStrategy.
    // TTL matches access token lifetime so the key self-cleans.
    const nowSeconds = Math.floor(Date.now() / 1000);
    const accessTokenTtl = 60 * 16; // 16 min — slightly longer than 15m token lifetime
    await this.redis.set(
      `invalidated_before:${userId}`,
      String(nowSeconds),
      'EX',
      accessTokenTtl,
    );

    return { message: 'Logged out successfully.' };
  }

  // ── Helpers ────────────────────────────────────────────────────────────
  private async generateTokens(userId: string, role: string) {
    const secret = this.config.getOrThrow<string>('JWT_ACCESS_SECRET');
    const expiresIn =
      (this.config.get<string>(
        'JWT_ACCESS_EXPIRES_IN',
      ) as `${number}${'s' | 'm' | 'h' | 'd'}`) ?? '15m';

    const accessToken = this.jwt.sign(
      { sub: userId, role },
      { secret, expiresIn },
    );

    const refreshToken = uuidv4();
    await this.redis.set(
      `refresh:${userId}`,
      refreshToken,
      'EX',
      REFRESH_TTL_SECONDS,
    );

    return { accessToken, refreshToken };
  }
}
