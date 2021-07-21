import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateHospitalsTable1626868164641 implements MigrationInterface {
    name = 'CreateHospitalsTable1626868164641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hospitals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, "phoneNumbers" text array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_02738c80d71453bc3e369a01766" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "hospitals"`);
    }

}
