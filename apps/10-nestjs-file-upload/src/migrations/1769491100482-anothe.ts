import { MigrationInterface, QueryRunner } from "typeorm";

export class Anothe1769491100482 implements MigrationInterface {
    name = 'Anothe1769491100482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "restaurant_address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "desc" character varying(255), "city" character varying NOT NULL, "street" character varying NOT NULL, "address" character varying, "pincode" character varying(255) NOT NULL, "country" character varying(255) NOT NULL, "state" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "restaurant_id" uuid, CONSTRAINT "REL_1acf4f27c6b48851a36a0fe851" UNIQUE ("restaurant_id"), CONSTRAINT "PK_109960073e718523582b9440353" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "restaurant_address" ADD CONSTRAINT "FK_1acf4f27c6b48851a36a0fe851e" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant_address" DROP CONSTRAINT "FK_1acf4f27c6b48851a36a0fe851e"`);
        await queryRunner.query(`DROP TABLE "restaurant_address"`);
    }

}
