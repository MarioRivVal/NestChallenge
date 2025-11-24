import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { IUserRepository } from 'src/users/domain/user.repository';
import { USER_REPOSITORY } from 'src/users/domain/user.repository';
import { passwordHasher } from 'src/common/security/password-hasher.service';
import { JwtService } from '@nestjs/jwt';
import { CustomLogger } from 'src/common/logger/custom-logger.service';
import { User } from 'src/users/domain/user';

export interface LoginResult {
  accessToken: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

/**
 * Servicio de autenticación:
 * - Valida credenciales
 * - Genera tokens JWT
 * - Devuelve info del usuario para el decorador en el contexto.
 */
@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: passwordHasher,
    private readonly jwtService: JwtService,
    private readonly logger: CustomLogger,
  ) {
    this.logger.setContext(AuthService.name);
  }

  // -------------------------------------------------------------- //

  private async validateUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    this.logger.log(`Validating user with mail: ${email}`);

    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;

    const isValid = await this.passwordHasher.compare(
      password,
      user.passwordHash,
    );
    if (!isValid) return null;

    return user;
  }

  // -------------------------------------------------------------- //

  async login(email: string, password: string): Promise<LoginResult> {
    const user = await this.validateUser(email, password);

    if (!user) {
      this.logger.warn(`Invalid credentials for user with email: ${email}`);
      throw new UnauthorizedException('Invalidid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    this.logger.log(`User ${email} logged in`);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };
  }
}
