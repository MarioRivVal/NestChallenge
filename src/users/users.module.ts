import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { UserRepositoryInMemory } from './infrastructure/persistence/user.inmemory.repository';
import { USER_REPOSITORY } from './domain/user.repository';
import { UsersController } from './presentation/users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: USER_REPOSITORY, useClass: UserRepositoryInMemory },
  ],
})
export class UsersModule {}
