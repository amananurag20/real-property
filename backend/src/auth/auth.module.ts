import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaModule } from '../prisma';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        // JwtModule registered without a global secret so each sign() call
        // passes its own secret (supports future multi-key rotation)
        JwtModule.register({}),
        PrismaModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule { }
