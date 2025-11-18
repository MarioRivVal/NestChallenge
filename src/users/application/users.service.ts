import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { IUserRepository } from '../domain/user.repository';
import { USER_REPOSITORY } from '../domain/user.repository';
import { User } from '../domain/user';
import { CustomLogger } from 'src/common/logger/custom-logger.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly logger: CustomLogger,
  ) {
    this.logger.setContext(UsersService.name);
  }

  async getAllUsers(): Promise<User[]> {
    this.logger.log('Getting all users');
    const users = await this.userRepository.findAll();
    this.logger.log(`Found ${users.length} users`);
    return users;
  }

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

  async createUser(params: {
    username: string;
    email: string;
    password: string;
  }): Promise<User> {
    this.logger.log(`Creating user: ${params.username}`);
    const user = new User(
      randomUUID(),
      params.username,
      params.email,
      params.password,
    );

    const saved = await this.userRepository.save(user);
    this.logger.log(`User created with id: ${saved.id} `);
    return saved;
  }
}
