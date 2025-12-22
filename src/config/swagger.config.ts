import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * Setup Swagger API documentation using central config
 */
export function setupSwagger(
  app: INestApplication,
  configService: ConfigService,
): void {
  const apiTitle = configService.get<string>('swagger.title') || 'ATS API';
  const apiDescription =
    configService.get<string>('swagger.description') ||
    'Applicant Tracking System API Documentation';
  const apiVersion = configService.get<string>('swagger.version') || '1.0';
  const apiDocsPath =
    configService.get<string>('swagger.docsPath') || 'api/docs';

  const config = new DocumentBuilder()
    .setTitle(apiTitle)
    .setDescription(apiDescription)
    .setVersion(apiVersion)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(apiDocsPath, app, document);
}
