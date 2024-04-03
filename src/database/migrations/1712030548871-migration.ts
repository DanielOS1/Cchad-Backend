import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712030548871 implements MigrationInterface {
    name = 'Migration1712030548871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" RENAME COLUMN "adress" TO "address"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" RENAME COLUMN "address" TO "adress"`);
    }

}
