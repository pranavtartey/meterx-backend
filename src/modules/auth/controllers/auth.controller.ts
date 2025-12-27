import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { RequestNonceDto } from '../dto/request-nonce.dto';
import { VerifySignatureDto } from '../dto/verify-signature.dto';
import { AuthResponseDto, NonceResponseDto } from '../dto/auth-response.dto';
import { Public } from 'src/common/decorators';

@ApiTags('Authentication')
@Controller('auth')
@Public()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('request-nonce')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request a nonce for wallet authentication' })
  @ApiResponse({ status: 200, type: NonceResponseDto })
  async requestNonce(@Body() dto: RequestNonceDto): Promise<NonceResponseDto> {
    return this.authService.requestNonce(dto);
  }

  @Post('verify-signature')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify signature and get JWT token' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  async verifySignature(
    @Body() dto: VerifySignatureDto,
  ): Promise<AuthResponseDto> {
    return this.authService.verifySignature(dto);
  }
}
