import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './application/users.service';
// import { UserRepositoryInMemory } from './infrastructure/persistence/user.inmemory.repository';
import { UserRepositoryTypeOrm } from './infrastructure/persistence/user.typeorm.repository';
import { UserEntity } from './infrastructure/persistence/user.entity';
import { USER_REPOSITORY } from './domain/user.repository';
import { UsersController } from './presentation/users.controller';
import { CustomLogger } from 'src/common/logger/custom-logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],

  controllers: [UsersController],
  providers: [
    UsersService,
    CustomLogger,
    { provide: USER_REPOSITORY, useClass: UserRepositoryTypeOrm },
  ],
})
export class UsersModule {}
