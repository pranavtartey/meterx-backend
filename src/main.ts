import { NestFactory } from '@nestjs/core';
import {
  Logger,
  ValidationPipe,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import helmet from 'helmet';
import * as qs from 'qs';
import { AppModule } from './app.module.js';
import { setupSwagger, getValidationOptions } from './config/index.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // Security Headers
  app.use(helmet());

  // CORS Configuration (using central config)
  const corsOrigins = configService.get<string[]>('corsOrigins') || [];
  app.enableCors({
    origin:
      corsOrigins.length > 0 && corsOrigins[0] !== '*' ? corsOrigins : true,
    allowedHeaders: [
      'Origin',
      'Content-Type',
      'Accept',
      'Observe',
      'Authorization',
      'Request-From',
      'Device-Id',
      'X-Requested-With',
      'X-HTTP-Method-Override',
      'Credentials',
    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'UPDATE', 'OPTIONS', 'PATCH'],
    credentials: true,
  });

  // Query Parser (support nested objects in query string)
  const httpAdapter = app.getHttpAdapter();
  httpAdapter
    .getInstance()
    .set('query parser', (query: string) => qs.parse(query));

  // Global Validation Pipe
  app.useGlobalPipes(new ValidationPipe(getValidationOptions()));

  // Class Serializer Interceptor (for DTOs with @Exclude/@Expose)
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: false,
    }),
  );

  // Swagger API Documentation (using central config)
  setupSwagger(app, configService);

  // Start Server (using central config)
  const port = configService.get<number>('port') || 8080;
  await app.listen(port);
  logger.log(`Application running on port ${port}`);
  logger.log(`Swagger docs available at http://localhost:${port}/api/docs`);
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
