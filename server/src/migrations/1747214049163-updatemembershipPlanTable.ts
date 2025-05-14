import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatemembershipPlanTable1747214049163 implements MigrationInterface {
    name = 'UpdatemembershipPlanTable1747214049163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "membership_plans" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "membership_plans" ADD "price" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "membership_plans" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "membership_plans" ADD "price" integer NOT NULL`);
    }

}
