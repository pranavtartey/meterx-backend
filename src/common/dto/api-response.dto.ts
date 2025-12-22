import { ApiProperty } from '@nestjs/swagger';
import { ResponseCodes } from '../enums/response-codes.enum.js';

export class ApiResponseDto<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ enum: ResponseCodes, example: ResponseCodes.SUCCESS })
  code: ResponseCodes;

  @ApiProperty({ example: 'Operation successful' })
  message: string;

  @ApiProperty()
  data: T;

  @ApiProperty({ example: '2025-12-15T10:00:00.000Z' })
  timestamp: string;
}
