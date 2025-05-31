import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateWashHistoryStructure1748715263228
  implements MigrationInterface
{
  name = 'UpdateWashHistoryStructure1748715263228';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "wash_history" ("id" SERIAL NOT NULL, "plate_number" character varying NOT NULL, "location_address" character varying NOT NULL, "membership_plan" character varying NOT NULL, "membership_used" character varying NOT NULL, "date" date NOT NULL, "price_membership" numeric(5,2) NOT NULL, "license_plate_membership_plan_id" integer, CONSTRAINT "PK_5c0967a99032d83e87a9dfda025" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "wash_history" ADD CONSTRAINT "FK_a320617a65d758e1c0943260125" FOREIGN KEY ("license_plate_membership_plan_id") REFERENCES "license_plates_membership_plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wash_history" DROP CONSTRAINT "FK_a320617a65d758e1c0943260125"`,
    );
    await queryRunner.query(`DROP TABLE "wash_history"`);
  }
}
