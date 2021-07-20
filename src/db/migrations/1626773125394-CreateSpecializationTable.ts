import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSpecializationTable1626773125394 implements MigrationInterface {
    name = 'CreateSpecializationTable1626773125394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "specializations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1d4b2b9ff96a76def0bf7195a8f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "specializations"`);
    }

}
