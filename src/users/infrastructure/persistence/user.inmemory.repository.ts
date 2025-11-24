import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user';

@Injectable()
export class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    return [...this.users];
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    return user ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);
    return user ?? null;
  }

  async save(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }

  async update(user: User): Promise<User> {
    const index = this.users.findIndex((u) => u.id === user.id);

    if (index === -1) {
      this.users.push(user);
    }

    return user;
  }

  async delete(id: string): Promise<void> {
    this.users.filter((u) => u.id !== id);
  }
}
