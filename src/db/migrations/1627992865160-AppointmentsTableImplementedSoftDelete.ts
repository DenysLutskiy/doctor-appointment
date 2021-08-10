import { MigrationInterface, QueryRunner } from 'typeorm';

export class AppointmentsTableImnlementedSoftDelete1627992865160
  implements MigrationInterface
{
  name = 'AppointmentsTableImplementedSoftDelete1627992865160';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "deletedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD CONSTRAINT "FK_13c2e57cb81b44f062ba24df57d" FOREIGN KEY ("patientId") REFERENCES "patiens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD CONSTRAINT "FK_0c1af27b469cb8dca420c160d65" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP CONSTRAINT "FK_0c1af27b469cb8dca420c160d65"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP CONSTRAINT "FK_13c2e57cb81b44f062ba24df57d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "deletedAt"`,
    );
  }
}
