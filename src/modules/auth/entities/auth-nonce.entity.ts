import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('auth_nonces')
@Index('idx_auth_nonce_wallet_address', ['walletAddress']) // For faster lookups
@Index('idx_auth_nonce_expires_at', ['expiresAt']) // For cleanup queries
export class AuthNonce {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'wallet_address', type: 'varchar', length: 42 })
  walletAddress: string;

  @Column({ type: 'varchar', length: 66 })
  nonce: string;

  @Column({ name: 'is_used', type: 'boolean', default: false })
  isUsed: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'expires_at', type: 'timestamp' })
  expiresAt: Date;
}
