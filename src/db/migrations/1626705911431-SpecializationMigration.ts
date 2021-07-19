import {MigrationInterface, QueryRunner} from "typeorm";

export class SpecializationMigration1626705911431 implements MigrationInterface {
    name = 'SpecializationMigration1626705911431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hospitals" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "hospitals" DROP COLUMN "phoneNumbers"`);
        await queryRunner.query(`ALTER TABLE "hospitals" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hospitals" ADD "phoneNumbers" text array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hospitals" DROP COLUMN "phoneNumbers"`);
        await queryRunner.query(`ALTER TABLE "hospitals" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "hospitals" ADD "phoneNumbers" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hospitals" ADD "address" character varying NOT NULL`);
    }

}
