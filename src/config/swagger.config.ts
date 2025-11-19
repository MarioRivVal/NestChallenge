import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Configura la documentación Swagger/OpenAPI.
 * - Define título, versión, etc.
 * - Expone la UI en /api
 */
export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Countries Hex API')
    .setDescription(
      'API del desafío: users + countries con arquitectura hexagonal',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
