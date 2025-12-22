import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseCodes } from '../enums/response-codes.enum.js';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let code = ResponseCodes.INTERNAL_ERROR;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as { message?: string }).message || message;

      // Map status to response code
      switch (status) {
        case HttpStatus.BAD_REQUEST:
          code = ResponseCodes.BAD_REQUEST;
          break;
        case HttpStatus.UNAUTHORIZED:
          code = ResponseCodes.UNAUTHORIZED;
          break;
        case HttpStatus.FORBIDDEN:
          code = ResponseCodes.FORBIDDEN;
          break;
        case HttpStatus.NOT_FOUND:
          code = ResponseCodes.NOT_FOUND;
          break;
        case HttpStatus.CONFLICT:
          code = ResponseCodes.CONFLICT;
          break;
        default:
          code = ResponseCodes.INTERNAL_ERROR;
      }
    }

    this.logger.error(
      `${request.method} ${request.url} - ${status}: ${message}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    response.status(status).json({
      success: false,
      code,
      message,
      data: null,
      timestamp: new Date().toISOString(),
    });
  }
}
