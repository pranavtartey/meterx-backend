import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseCodes } from '../enums/response-codes.enum.js';

export interface ApiResponse<T> {
  success: boolean;
  code: ResponseCodes;
  message: string;
  data: T;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data: T) => ({
        success: true,
        code: ResponseCodes.SUCCESS,
        message: 'Operation successful',
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
