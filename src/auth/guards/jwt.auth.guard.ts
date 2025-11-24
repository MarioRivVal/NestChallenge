import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard que protege rutas usando la estrategia 'jwt'.
 * Se usa en controllers con @UseGuards(JwtAuthGuard).
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
