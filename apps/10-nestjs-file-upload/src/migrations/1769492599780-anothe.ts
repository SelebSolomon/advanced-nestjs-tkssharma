import { MigrationInterface, QueryRunner } from "typeorm";

export class Anothe1769492599780 implements MigrationInterface {
    name = 'Anothe1769492599780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_e33609a30000c785ac2f0d7d4f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_56f608bad5f6c2788fcec7bc15"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5c4bb4b0b595ee63318f548fd5"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP COLUMN "foodType"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP COLUMN "mealType"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP COLUMN "cuisineType"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD "food_type" character varying`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD "meal_type" character varying`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD "cuisine_type" character varying`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD "ingredients" character varying`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD "thumbnails" character varying`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD "delivery_time" integer`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD "rating" integer`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD "category" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD "category" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD "name" character varying(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP COLUMN "delivery_time"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP COLUMN "thumbnails"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP COLUMN "ingredients"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP COLUMN "cuisine_type"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP COLUMN "meal_type"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" DROP COLUMN "food_type"`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD "cuisineType" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD "mealType" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "restaurant_dishes" ADD "foodType" character varying(50)`);
        await queryRunner.query(`CREATE INDEX "IDX_5c4bb4b0b595ee63318f548fd5" ON "restaurant_dishes" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_56f608bad5f6c2788fcec7bc15" ON "restaurant_dishes" ("category") `);
        await queryRunner.query(`CREATE INDEX "IDX_e33609a30000c785ac2f0d7d4f" ON "restaurant_dishes" ("cuisineType") `);
    }

}
