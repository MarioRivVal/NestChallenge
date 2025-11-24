import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CustomLogger } from 'src/common/logger/custom-logger.service';

export interface JwtPayload {
  sub: string; // user id
  email: string;
  username: string;
}

/**
 * Estrategia JWT.
 * - Lee el token del header Authorization: Bearer <token>
 * - Verifica firma y expiración
 * - Expone los datos del usuario en request.user
 */

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: CustomLogger,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') ?? 'dev-secret',
    });

    this.logger.setContext(JwtStrategy.name);
  }

  /**
   * Se ejecuta si el token es válido.
   * Lo que retornes aquí será accesible como request.user
   * y por tanto disponible en @CurrentUser().
   */
  validate(payload: JwtPayload) {
    this.logger.log(
      `Valid JWT for user ${payload.email} (sub: ${payload.sub})`,
    );

    return {
      userId: payload.sub,
      email: payload.email,
      username: payload.username,
    };
  }
}
