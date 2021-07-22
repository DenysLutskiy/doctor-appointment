import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAppointmentsTable1626983760897
  implements MigrationInterface
{
  name = 'CreateAppointmentsTable1626983760897';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "patientId" character varying NOT NULL, "doctorId" character varying NOT NULL, "roomId" character varying NOT NULL, "scheduleDateAndTime" character varying NOT NULL, "duration" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "appointments"`);
  }
}
