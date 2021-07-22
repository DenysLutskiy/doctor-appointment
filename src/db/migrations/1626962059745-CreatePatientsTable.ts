import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePatientsTable1626962059745 implements MigrationInterface {
    name = 'CreatePatientsTable1626962059745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patiens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "gender" character varying NOT NULL, "age" integer NOT NULL, "bornCity" character varying NOT NULL, "bornCountry" character varying NOT NULL, "address" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_2fc07d2b1895b00d070c6a6974" UNIQUE ("userId"), CONSTRAINT "PK_c1a119597a3a807b1ec4bd06ce1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "patiens" ADD CONSTRAINT "FK_2fc07d2b1895b00d070c6a69748" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patiens" DROP CONSTRAINT "FK_2fc07d2b1895b00d070c6a69748"`);
        await queryRunner.query(`DROP TABLE "patiens"`);
    }

}
