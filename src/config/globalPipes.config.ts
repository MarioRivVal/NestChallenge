import { INestApplication, ValidationPipe } from '@nestjs/common';

export default function globalPipesConfig(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
}
