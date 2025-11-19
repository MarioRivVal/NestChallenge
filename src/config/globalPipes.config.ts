import { INestApplication, ValidationPipe } from '@nestjs/common';

/**
 * Registra los pipes globales de la aplicación.
 * Actualmente:
 * - ValidationPipe para validar DTOs de entrada
 */

export default function globalPipesConfig(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
}
