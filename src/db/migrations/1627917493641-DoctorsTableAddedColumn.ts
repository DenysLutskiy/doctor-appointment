import { MigrationInterface, QueryRunner } from 'typeorm';

export class DoctorsTableAddedColumn1627917493641
  implements MigrationInterface
{
  name = 'DoctorsTableAddedColumn1627917493641';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD "associatedRooms" uuid array`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctors" DROP COLUMN "associatedRooms"`,
    );
  }
}
