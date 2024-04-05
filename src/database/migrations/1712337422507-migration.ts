import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712337422507 implements MigrationInterface {
    name = 'Migration1712337422507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."patient_gender_enum" AS ENUM('Masculino', 'Femenino')`);
        await queryRunner.query(`CREATE TYPE "public"."patient_forecast_enum" AS ENUM('FONASA', 'ISAPRE', 'Particular')`);
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "rut" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "gender" "public"."patient_gender_enum" NOT NULL, "birthdate" TIMESTAMP(0) NOT NULL, "phone" character varying NOT NULL, "address" character varying NOT NULL, "forecast" "public"."patient_forecast_enum" NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "createAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updateAt" TIMESTAMP(0) NOT NULL DEFAULT now(), CONSTRAINT "UQ_35c81f692a3381882be74636a77" UNIQUE ("rut"), CONSTRAINT "UQ_2c56e61f9e1afb07f28882fcebb" UNIQUE ("email"), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."appointment_state_enum" AS ENUM('Reservada', 'Reprogramada', 'Cancelada', 'Completada')`);
        await queryRunner.query(`CREATE TYPE "public"."appointment_type_enum" AS ENUM('Consulta', 'Control', 'Procedimiento')`);
        await queryRunner.query(`CREATE TABLE "appointment" ("id" SERIAL NOT NULL, "state" "public"."appointment_state_enum" NOT NULL, "confirmed" boolean NOT NULL DEFAULT false, "type" "public"."appointment_type_enum" NOT NULL, "diagnosis" character varying NOT NULL, "treatment" character varying NOT NULL, "prescriptionDrugs" character varying NOT NULL, "createAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updateAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "patientId" integer, "slotId" integer, CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."medic_specialty_enum" AS ENUM('Cardiología', 'Dermatología', 'Gastroenterología', 'Neurología', 'Ginecología', 'Obstetricia', 'Oftalmología', 'Psiquiatría', 'Medicina Interna')`);
        await queryRunner.query(`CREATE TABLE "medic" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "specialty" "public"."medic_specialty_enum" NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "createAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updateAt" TIMESTAMP(0) NOT NULL DEFAULT now(), CONSTRAINT "UQ_1666724850c1c2eb03bcebcd20a" UNIQUE ("email"), CONSTRAINT "PK_6fa7ab55cb3c448fde4ce548270" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "branch" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "createAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updateAt" TIMESTAMP(0) NOT NULL DEFAULT now(), CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "box" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "createAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updateAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "branchId" integer, CONSTRAINT "PK_1a95bae3d12a9f21be6502e8a8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "time" tstzrange NOT NULL, "blockedTime" tstzrange, "slotDuration" interval NOT NULL, "createAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updateAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "medicId" integer, "boxId" integer, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "slot" ("id" SERIAL NOT NULL, "time" tstzrange NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "createAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updateAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "scheduleId" integer, CONSTRAINT "PK_5b1f733c4ba831a51f3c114607b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "createAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updateAt" TIMESTAMP(0) NOT NULL DEFAULT now(), CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "secretary" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "createAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updateAt" TIMESTAMP(0) NOT NULL DEFAULT now(), CONSTRAINT "UQ_dfad141abd9ea263d0e03a9bb98" UNIQUE ("email"), CONSTRAINT "PK_e6c85e70fd48750bbd8e34a553c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_5ce4c3130796367c93cd817948e" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_b463fce395ead7791607a5c33eb" FOREIGN KEY ("slotId") REFERENCES "slot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "box" ADD CONSTRAINT "FK_43bad8a5900b00170681862917c" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_aba758197709bbcc373da657fda" FOREIGN KEY ("medicId") REFERENCES "medic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_5f9d4fa83322fd9099741c04675" FOREIGN KEY ("boxId") REFERENCES "box"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "slot" ADD CONSTRAINT "FK_39536b8da3a6c3ba119f913fd4b" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "slot" DROP CONSTRAINT "FK_39536b8da3a6c3ba119f913fd4b"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_5f9d4fa83322fd9099741c04675"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_aba758197709bbcc373da657fda"`);
        await queryRunner.query(`ALTER TABLE "box" DROP CONSTRAINT "FK_43bad8a5900b00170681862917c"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_b463fce395ead7791607a5c33eb"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_5ce4c3130796367c93cd817948e"`);
        await queryRunner.query(`DROP TABLE "secretary"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "slot"`);
        await queryRunner.query(`DROP TABLE "schedule"`);
        await queryRunner.query(`DROP TABLE "box"`);
        await queryRunner.query(`DROP TABLE "branch"`);
        await queryRunner.query(`DROP TABLE "medic"`);
        await queryRunner.query(`DROP TYPE "public"."medic_specialty_enum"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
        await queryRunner.query(`DROP TYPE "public"."appointment_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."appointment_state_enum"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TYPE "public"."patient_forecast_enum"`);
        await queryRunner.query(`DROP TYPE "public"."patient_gender_enum"`);
    }

}
