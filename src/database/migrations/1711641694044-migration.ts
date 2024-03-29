import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711641694044 implements MigrationInterface {
    name = 'Migration1711641694044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."patient_role_enum" AS ENUM('Paciente')`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "role" "public"."patient_role_enum" NOT NULL DEFAULT 'Paciente'`);
        await queryRunner.query(`ALTER TABLE "medic" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."medic_role_enum" AS ENUM('Médico')`);
        await queryRunner.query(`ALTER TABLE "medic" ADD "role" "public"."medic_role_enum" NOT NULL DEFAULT 'Médico'`);
        await queryRunner.query(`ALTER TABLE "secretary" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."secretary_role_enum" AS ENUM('Secretaria')`);
        await queryRunner.query(`ALTER TABLE "secretary" ADD "role" "public"."secretary_role_enum" NOT NULL DEFAULT 'Secretaria'`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."admin_role_enum" AS ENUM('Administrador')`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "role" "public"."admin_role_enum" NOT NULL DEFAULT 'Administrador'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."admin_role_enum"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "secretary" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."secretary_role_enum"`);
        await queryRunner.query(`ALTER TABLE "secretary" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "medic" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."medic_role_enum"`);
        await queryRunner.query(`ALTER TABLE "medic" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."patient_role_enum"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "role" character varying NOT NULL`);
    }

}
