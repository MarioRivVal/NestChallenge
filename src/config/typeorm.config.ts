import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

/**
 * Devuelve la configuración de TypeORM usando variables de entorno.
 * - Tipo de base de datos (Postgres)
 * - Credenciales
 * - Entidades
 */

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASS'),
  database: configService.get<string>('DB_NAME'),
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: true, // Note: Cambiarlo a false en producción
});
