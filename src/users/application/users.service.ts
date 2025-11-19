import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import type { IUserRepository } from '../domain/user.repository';
import { USER_REPOSITORY } from '../domain/user.repository';
import { User } from '../domain/user';
import { CustomLogger } from 'src/common/logger/custom-logger.service';
import { passwordHasher } from 'src/common/security/password-hasher.service';

/**
 * Servicio de aplicación para el contexto de Users.
 * - Orquesta casos de uso (crear, listar, obtener por id, y más)
 * - No conoce detalles de persistencia (usa IUserRepository)
 * - Aplica reglas relacionadas con la creación de usuario (hashing, conflictos, etc.)
 */
@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly logger: CustomLogger,
    private readonly passwordHasher: passwordHasher,
  ) {
    this.logger.setContext(UsersService.name);
  }

  // -------------------------------------------------------------- //

  async createUser(params: {
    username: string;
    email: string;
    password: string;
  }): Promise<User> {
    this.logger.log(`Creating user: ${params.username}`);
    const passwordHash = await this.passwordHasher.hash(params.password);

    const user = User.create({
      username: params.username,
      email: params.email,
      passwordHash,
    });

    try {
      const saved = await this.userRepository.save(user);
      this.logger.log(`User created with id: ${saved.id} `);
      return saved;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === '23505') {
        this.logger.warn(
          `Email already exists: ${params.email} (unique constraint)`,
        );
        throw new ConflictException('Email already exists');
      }

      this.logger.error(`Unexpected error creating user: ${String(error)}`);
      throw new InternalServerErrorException(
        'Error creating user. Please try again later.',
      );
    }
  }

  // -------------------------------------------------------------- //

  async getAllUsers(): Promise<User[]> {
    this.logger.log('Getting all users');
    const users = await this.userRepository.findAll();
    this.logger.log(`Found ${users.length} users`);
    return users;
  }

  // -------------------------------------------------------------- //

  async getUserById(id: string): Promise<User> {
    this.logger.log(`Getting user by id:${id}`);
    const user = await this.userRepository.findById(id);
    if (!user) {
      this.logger.error(`User with id: ${id} not found`);
      throw new NotFoundException('User not found');
    }
    this.logger.log(`User with id:${id} FOUND`);
    return user;
  }

  // -------------------------------------------------------------- //
}
