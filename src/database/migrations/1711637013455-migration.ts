import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711637013455 implements MigrationInterface {
    name = 'Migration1711637013455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" ADD "patientId" integer`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "shiftId" integer`);
        await queryRunner.query(`ALTER TABLE "box" ADD "branchId" integer`);
        await queryRunner.query(`ALTER TABLE "shift" ADD "medicId" integer`);
        await queryRunner.query(`ALTER TABLE "shift" ADD "boxId" integer`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_5ce4c3130796367c93cd817948e" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_a5f25934938ae7ee74dcdff5b6d" FOREIGN KEY ("shiftId") REFERENCES "shift"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "box" ADD CONSTRAINT "FK_43bad8a5900b00170681862917c" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "shift" ADD CONSTRAINT "FK_bc08a8160548b3c38461a43adc2" FOREIGN KEY ("medicId") REFERENCES "medic"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "shift" ADD CONSTRAINT "FK_8bb2bbf74e98921530f49ddb523" FOREIGN KEY ("boxId") REFERENCES "box"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shift" DROP CONSTRAINT "FK_8bb2bbf74e98921530f49ddb523"`);
        await queryRunner.query(`ALTER TABLE "shift" DROP CONSTRAINT "FK_bc08a8160548b3c38461a43adc2"`);
        await queryRunner.query(`ALTER TABLE "box" DROP CONSTRAINT "FK_43bad8a5900b00170681862917c"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_a5f25934938ae7ee74dcdff5b6d"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_5ce4c3130796367c93cd817948e"`);
        await queryRunner.query(`ALTER TABLE "shift" DROP COLUMN "boxId"`);
        await queryRunner.query(`ALTER TABLE "shift" DROP COLUMN "medicId"`);
        await queryRunner.query(`ALTER TABLE "box" DROP COLUMN "branchId"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "shiftId"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "patientId"`);
    }

}
