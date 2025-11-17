// src/config/swagger.config.ts
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Countries Hex API')
    .setDescription(
      'API del desafío: users + countries con arquitectura hexagonal',
    )
    .setVersion('1.0')
    .addBearerAuth() // lo usaremos cuando metamos JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
