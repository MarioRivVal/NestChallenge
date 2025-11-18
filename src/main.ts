import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import globalPipesConfig from './config/globalPipes.config';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  globalPipesConfig(app);
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
