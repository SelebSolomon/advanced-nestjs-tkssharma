import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1769483249513 implements MigrationInterface {
  name = 'Initial1769483249513';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD "akamu" character varying(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "akamu"`);
  }
}
