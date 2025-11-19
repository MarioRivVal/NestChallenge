import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from 'src/users/domain/user.repository';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/domain/user';

/**
 * Implementación de IUserRepository usando TypeORM y Postgres.
 * - Traduce entre User (dominio) y UserEntity (infraestructura)
 * - Usa Repository<UserEntity> internamente
 */
@Injectable()
export class UserRepositoryTypeOrm implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  private toDomain(entity: UserEntity): User {
    const user = new User(
      entity.id,
      entity.username,
      entity.email,
      entity.passwordHash,
    );
    return user;
  }

  private toEntity(user: User): UserEntity {
    const entity = new UserEntity();
    entity.id = user.id;
    entity.username = user.username;
    entity.email = user.email;
    entity.passwordHash = user.passwordHash;

    return entity;
  }

  async findAll(): Promise<User[]> {
    const entities = await this.repo.find();
    return entities.map((e) => this.toDomain(e));
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async save(user: User): Promise<User> {
    const entity = this.toEntity(user);
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }
}
