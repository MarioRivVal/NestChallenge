import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './application/users.service';
// import { UserRepositoryInMemory } from './infrastructure/persistence/user.inmemory.repository';
import { UserRepositoryTypeOrm } from './infrastructure/persistence/user.typeorm.repository';
import { UserEntity } from './infrastructure/persistence/user.entity';
import { USER_REPOSITORY } from './domain/user.repository';
import { UsersController } from './infrastructure/users.controller';
import { passwordHasher } from 'src/common/security/password-hasher.service';

/**
 * Módulo del contexto de Users.
 * - Registra controller, service y repositorio
 * - Conecta el puerto de dominio USER_REPOSITORY con la implementación TypeORM
 */

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],

  controllers: [UsersController],
  providers: [
    UsersService,
    passwordHasher,
    { provide: USER_REPOSITORY, useClass: UserRepositoryTypeOrm },
  ],
  exports: [passwordHasher, USER_REPOSITORY],
})
export class UsersModule {}
