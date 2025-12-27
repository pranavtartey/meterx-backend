import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { ethers } from 'ethers';
import { User } from '../../users/entities/user.entity';
import { AuthNonce } from '../entities/auth-nonce.entity';
import { RequestNonceDto } from '../dto/request-nonce.dto';
import { VerifySignatureDto } from '../dto/verify-signature.dto';
import { AuthResponseDto, NonceResponseDto } from '../dto/auth-response.dto';
import { AUTH_MESSAGES } from 'src/common/messages/auth/auth.messges';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(AuthNonce)
    private nonceRepository: Repository<AuthNonce>,
    private jwtService: JwtService,
  ) {}

  async requestNonce(dto: RequestNonceDto): Promise<NonceResponseDto> {
    const { walletAddress } = dto;
    const normalizedAddress = walletAddress.toLowerCase();

    // Clean up expired nonces
    await this.nonceRepository.delete({
      expiresAt: LessThan(new Date()),
    });

    // Generate random nonce
    const nonce = ethers.hexlify(ethers.randomBytes(32));
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete old nonce for this wallet and create new one
    await this.nonceRepository.delete({ walletAddress: normalizedAddress });

    await this.nonceRepository.insert({
      walletAddress: normalizedAddress,
      nonce,
      isUsed: false,
      expiresAt,
    });

    // Generate message to sign
    const message = this.generateSignMessage(normalizedAddress, nonce);

    return { nonce, message };
  }

  async verifySignature(dto: VerifySignatureDto): Promise<AuthResponseDto> {
    const { walletAddress, signature } = dto;
    const normalizedAddress = walletAddress.toLowerCase();

    // Find nonce
    const nonceRecord = await this.nonceRepository.findOne({
      where: { walletAddress: normalizedAddress },
    });

    if (!nonceRecord) {
      throw new BadRequestException(
        'No nonce found. Please request a nonce first.',
      );
    }

    if (nonceRecord.isUsed) {
      throw new BadRequestException('Nonce has already been used.');
    }

    if (new Date() > nonceRecord.expiresAt) {
      throw new BadRequestException('Nonce has expired.');
    }

    // Verify signature
    const message = this.generateSignMessage(
      normalizedAddress,
      nonceRecord.nonce,
    );

    let recoveredAddress: string;
    try {
      recoveredAddress = ethers.verifyMessage(message, signature);
    } catch {
      throw new UnauthorizedException('Invalid signature format');
    }

    if (recoveredAddress.toLowerCase() !== normalizedAddress) {
      throw new UnauthorizedException('Signature verification failed');
    }

    // Mark nonce as used
    await this.nonceRepository.update({ id: nonceRecord.id }, { isUsed: true });

    // Find or create user
    let user = await this.userRepository.findOne({
      where: { walletAddress: normalizedAddress },
    });

    if (!user) {
      user = this.userRepository.create({
        walletAddress: normalizedAddress,
        email: `${normalizedAddress}@wallet.local`,
        role: 'CONSUMER',
        isActive: true,
      });
      await this.userRepository.save(user);
    }

    // Generate JWT
    const payload = {
      sub: user.id,
      walletAddress: user.walletAddress,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        walletAddress: user.walletAddress,
        role: user.role,
      },
    };
  }

  private generateSignMessage(walletAddress: string, nonce: string): string {
    // const domain = 'meter-x.io';
    const issuedAt = new Date().toISOString();

    return `Welcome to Meter-X!

Click to sign in and accept the Meter-X Terms of Service.

This request will not trigger a blockchain transaction or cost any gas fees.

Wallet address:
${walletAddress}

Nonce:
${nonce}

Issued At:
${issuedAt}`;
  }

  async validateUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId, isActive: true },
    });

    if (!user) {
      throw new UnauthorizedException(AUTH_MESSAGES.UNAUTHORIZED_EXCEPTION);
    }

    return user;
  }
}
