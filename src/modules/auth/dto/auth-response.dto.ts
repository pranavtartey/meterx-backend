import { ApiProperty } from '@nestjs/swagger';

export class NonceResponseDto {
  @ApiProperty({ example: '0xabcd1234...' })
  nonce: string;

  @ApiProperty({ example: 'Welcome to Meter-X!...' })
  message: string;
}

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  walletAddress: string;

  @ApiProperty()
  role: string;
}

export class AuthResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;
}
