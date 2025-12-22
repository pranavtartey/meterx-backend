import { ValidationPipeOptions } from '@nestjs/common';

/**
 * Get ValidationPipe configuration options
 */
export function getValidationOptions(): ValidationPipeOptions {
  return {
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  };
}
