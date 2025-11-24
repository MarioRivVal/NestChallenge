// src/auth/config/jwt.config.ts
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtConfig = (config: ConfigService): JwtModuleOptions => {
  const secret = config.get<string>('JWT_SECRET') ?? 'change-me-in-env';

  const expiresIn = parseInt(
    config.get<string>('JWT_EXPIRES_IN') ?? '86400',
    10,
  );

  return {
    secret,
    signOptions: {
      expiresIn,
    },
  };
};
