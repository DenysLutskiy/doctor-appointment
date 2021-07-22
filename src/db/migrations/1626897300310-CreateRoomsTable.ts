import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRoomsTable1626897300310 implements MigrationInterface {
  name = 'CreateRoomsTable1626897300310';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rooms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "doctorId" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_48b79438f8707f3d9ca83d85ea0" UNIQUE ("name"), CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "rooms" ADD CONSTRAINT "FK_d234dd8964fd8cf2ea7bf7d7dde" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rooms" DROP CONSTRAINT "FK_d234dd8964fd8cf2ea7bf7d7dde"`,
    );
    await queryRunner.query(`DROP TABLE "rooms"`);
  }
}
