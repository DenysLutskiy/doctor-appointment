import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRoomsTable1626794403458 implements MigrationInterface {
    name = 'CreateRoomsTable1626794403458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rooms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "doctors" character varying array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD "roomsId" uuid`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD CONSTRAINT "FK_d89a1d1b700dee0770e6c4bcb93" FOREIGN KEY ("roomsId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctors" DROP CONSTRAINT "FK_d89a1d1b700dee0770e6c4bcb93"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "roomsId"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
    }

}
