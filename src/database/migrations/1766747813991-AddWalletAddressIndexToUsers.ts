import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWalletAddressIndexToUsers1766747813991 implements MigrationInterface {
  name = 'AddWalletAddressIndexToUsers1766747813991';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "idx_user_wallet_address" ON "users" ("wallet_address") WHERE wallet_address IS NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."idx_user_wallet_address"`);
  }
}
