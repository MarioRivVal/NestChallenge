import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { getTypeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // disponible en toda la app
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),

    UsersModule,
  ],
})
export class AppModule {}
