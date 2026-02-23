import {
    Controller,
    Post,
    Body,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '@auth/auth.service';
import { RegisterDto } from '@auth/dto/register.dto';
import { SendOtpDto } from '@auth/dto/send-otp.dto';
import { VerifyOtpDto } from '@auth/dto/verify-otp.dto';
import { RefreshTokenDto } from '@auth/dto/refresh-token.dto';
import { JwtAuthGuard, CurrentUser } from '@auth';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // ── SIGN UP ─────────────────────────────────────────────────────────

    /**
     * Step 1 (Sign Up) — Register a new account
     * Validates phone is not already taken, stores profile data, sends OTP.
     */
    @Post('register')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Sign up: register a new account and send OTP' })
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    // ── LOGIN ────────────────────────────────────────────────────────────

    /**
     * Step 1 (Login) — Send OTP to an existing account
     * Returns 400 if the phone is not yet registered → use /register first.
     */
    @Post('send-otp')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login: send OTP to an existing account' })
    sendOtp(@Body() dto: SendOtpDto) {
        return this.authService.sendOtp(dto);
    }

    // ── SHARED: Verify OTP (step 2 for both flows) ───────────────────────

    /**
     * Step 2 (Sign Up & Login) — Verify OTP
     * - Sign-up path: creates the user from pending registration data
     * - Login path: authenticates the existing user
     * Returns { accessToken, refreshToken, user }
     */
    @Post('verify-otp')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Verify OTP — completes both sign-up and login flows' })
    verifyOtp(@Body() dto: VerifyOtpDto) {
        return this.authService.verifyOtp(dto);
    }

    // ── TOKEN MANAGEMENT ─────────────────────────────────────────────────

    /** Rotate tokens using a valid refresh token */
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Refresh access token using refresh token' })
    refresh(@Body() dto: RefreshTokenDto) {
        return this.authService.refresh(dto);
    }

    /** Logout — revokes the refresh token */
    @Post('logout')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Logout and revoke refresh token' })
    logout(@CurrentUser() user: { id: string }) {
        return this.authService.logout(user.id);
    }
}
