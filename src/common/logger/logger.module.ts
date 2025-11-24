// src/common/logger/logger.module.ts
import { Global, Module } from '@nestjs/common';
import { CustomLogger } from './custom-logger.service';

/**
 * Módulo global para el logger.
 * - Expone CustomLogger a toda la app sin tener que registrarlo en cada módulo.
 */
@Global()
@Module({
  providers: [CustomLogger],
  exports: [CustomLogger],
})
export class LoggerModule {}
