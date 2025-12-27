import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AUTH_MESSAGES } from 'src/common/messages/auth/auth.messges';

export class VerifySignatureDto {
  @ApiProperty({
    example: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    description: 'Ethereum wallet address',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^0x[a-fA-F0-9]{40}$/, { message: AUTH_MESSAGES.INVALID_ADDRESS })
  walletAddress: string;

  @ApiProperty({
    example: '0x1234567890abcdef...',
    description: 'Signed message signature',
  })
  @IsString()
  @IsNotEmpty()
  signature: string;
}
