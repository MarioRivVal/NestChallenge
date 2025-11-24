import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './infrastructure/auth.controller';
import { AuthService } from './application/auth.service';
import { JwtStrategy } from './infrastructure/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { getJwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard, JwtModule],
})
export class AuthModule {}
