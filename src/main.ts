import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import globalPipesConfig from './config/globalPipes.config';
import { setupSwagger } from './config/swagger.config';

/**
 * Punto de entrada de la aplicación NestJS.
 * - Crea la app
 * - Aplica configuración global (pipes, swagger)
 * - Arranca el servidor HTTP
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  globalPipesConfig(app);
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
