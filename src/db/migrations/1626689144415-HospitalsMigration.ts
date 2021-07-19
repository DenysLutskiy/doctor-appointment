import {MigrationInterface, QueryRunner} from "typeorm";

export class HospitalsMigration1626689144415 implements MigrationInterface {
    name = 'HospitalsMigration1626689144415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hospitals" DROP COLUMN "phoneNumbers"`);
        await queryRunner.query(`ALTER TABLE "hospitals" ADD "phoneNumbers" text array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hospitals" DROP COLUMN "phoneNumbers"`);
        await queryRunner.query(`ALTER TABLE "hospitals" ADD "phoneNumbers" integer array NOT NULL`);
    }

}
