import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDoctorsTable1626875680097 implements MigrationInterface {
  name = 'CreateDoctorsTable1626875680097';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "doctors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "specializationId" uuid NOT NULL, "level" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_55651e05e46413d510215535ed" UNIQUE ("userId"), CONSTRAINT "PK_8207e7889b50ee3695c2b8154ff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD CONSTRAINT "FK_55651e05e46413d510215535edf" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD CONSTRAINT "FK_23d77f3a8a5715c6e1f42518dba" FOREIGN KEY ("specializationId") REFERENCES "specializations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctors" DROP CONSTRAINT "FK_23d77f3a8a5715c6e1f42518dba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" DROP CONSTRAINT "FK_55651e05e46413d510215535edf"`,
    );
    await queryRunner.query(`DROP TABLE "doctors"`);
  }
}
