import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import globalPipesConfig from './config/globalPipes.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  globalPipesConfig(app);
}
bootstrap();
