import { MigrationInterface, QueryRunner } from "typeorm";

export class Another1769490904053 implements MigrationInterface {
    name = 'Another1769490904053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant_addresses" DROP CONSTRAINT "FK_567bf264870b086ccc38483114f"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP CONSTRAINT "FK_be04b881031d4bae354c5a76f4c"`);
        await queryRunner.query(`CREATE TABLE "restaurants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying, "type" character varying, "website_url" character varying, "title" character varying, "social_links" jsonb, "cuisine" character varying, "ratings" integer, "average_price" integer, "latitude" character varying NOT NULL, "longitude" character varying NOT NULL, "contact_no" character varying, "thumbnails" jsonb, "delivery_time" integer, "delivery_options" character varying, "pickup_options" character varying NOT NULL, "opens_at" character varying NOT NULL, "restaurant_address" jsonb, "closes_at" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e2133a72eb1cc8f588f7b503e68" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "restaurant_addresses" ADD CONSTRAINT "FK_567bf264870b086ccc38483114f" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD CONSTRAINT "FK_be04b881031d4bae354c5a76f4c" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP CONSTRAINT "FK_be04b881031d4bae354c5a76f4c"`);
        await queryRunner.query(`ALTER TABLE "restaurant_addresses" DROP CONSTRAINT "FK_567bf264870b086ccc38483114f"`);
        await queryRunner.query(`DROP TABLE "restaurants"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD CONSTRAINT "FK_be04b881031d4bae354c5a76f4c" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurant_addresses" ADD CONSTRAINT "FK_567bf264870b086ccc38483114f" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
