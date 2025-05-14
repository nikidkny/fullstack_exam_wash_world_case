import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLocationTable1747211427916 implements MigrationInterface {
    name = 'AddLocationTable1747211427916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "locations" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "open_hours" character varying NOT NULL, "has_self_wash" boolean NOT NULL, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "locations"`);
    }

}
