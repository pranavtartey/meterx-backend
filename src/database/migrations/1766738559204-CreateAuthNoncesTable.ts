import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthNoncesTable1766738559204 implements MigrationInterface {
  name = 'CreateAuthNoncesTable1766738559204';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "auth_nonces" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "wallet_address" character varying(42) NOT NULL, "nonce" character varying(66) NOT NULL, "is_used" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "expires_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_43f4e702fc79d337c03bce1de16" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_auth_nonce_expires_at" ON "auth_nonces" ("expires_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_auth_nonce_wallet_address" ON "auth_nonces" ("wallet_address") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."idx_auth_nonce_wallet_address"`,
    );
    await queryRunner.query(`DROP INDEX "public"."idx_auth_nonce_expires_at"`);
    await queryRunner.query(`DROP TABLE "auth_nonces"`);
  }
}
