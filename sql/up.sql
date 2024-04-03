-- Equivalente a Migration1712175862965.up()
CREATE TYPE "public"."patient_gender_enum" AS ENUM('masculino', 'femenino');
CREATE TYPE "public"."patient_forecast_enum" AS ENUM('FONASA', 'ISAPRE', 'Particular');

CREATE TABLE "patient" (
    "id" SERIAL NOT NULL,
    "name" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    "email" character varying NOT NULL,
    "password" character varying NOT NULL,
    "gender" "public"."patient_gender_enum" NOT NULL,
    "birthdate" TIMESTAMP(0) NOT NULL,
    "phone" character varying NOT NULL,
    "address" character varying NOT NULL,
    "forecast" "public"."patient_forecast_enum" NOT NULL,
    "enabled" boolean NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(0) NOT NULL DEFAULT now(),
    "updateAt" TIMESTAMP(0) NOT NULL DEFAULT now(),
    CONSTRAINT "UQ_2c56e61f9e1afb07f28882fcebb" UNIQUE ("email"),
    CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id")
);

CREATE TYPE "public"."appointment_state_enum" AS ENUM('Aceptado', 'Rechazado', 'Reprogramado', 'Cancelado');
CREATE TYPE "public"."appointment_type_enum" AS ENUM('consulta', 'control', 'procedimiento');

CREATE TABLE "appointment" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(0) NOT NULL,
    "endTime" TIMESTAMP(0) NOT NULL,
    "state" "public"."appointment_state_enum" NOT NULL,
    "confirmed" boolean NOT NULL DEFAULT false,
    "completed" boolean NOT NULL DEFAULT false,
    "type" "public"."appointment_type_enum" NOT NULL,
    "createAt" TIMESTAMP(0) NOT NULL DEFAULT now(),
    "updateAt" TIMESTAMP(0) NOT NULL DEFAULT now(),
    "patientId" integer,
    "shiftId" integer,
    CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id")
);

CREATE TYPE "public"."medic_specialty_enum" AS ENUM('Cardiología', 'Dermatología', 'Gastroenterology', 'Neurología', 'Ginecología', 'Obstetricia', 'Oftalmología', 'Psiquiatría', 'Medicina Interna');

CREATE TABLE "medic" (
    "id" SERIAL NOT NULL,
    "name" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    "email" character varying NOT NULL,
    "password" character varying NOT NULL,
    "specialty" "public"."medic_specialty_enum" NOT NULL,
    "enabled" boolean NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(0) NOT NULL DEFAULT now(),
    "updateAt" TIMESTAMP(0) NOT NULL DEFAULT now(),
    CONSTRAINT "UQ_1666724850c1c2eb03bcebcd20a" UNIQUE ("email"),
    CONSTRAINT "PK_6fa7ab55cb3c448fde4ce548270" PRIMARY KEY ("id")
);

CREATE TABLE "branch" (
    "id" SERIAL NOT NULL,
    "name" character varying NOT NULL,
    "createAt" TIMESTAMP(0) NOT NULL DEFAULT now(),
    "updateAt" TIMESTAMP(0) NOT NULL DEFAULT now(),
    CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id")
);

CREATE TABLE "box" (
    "id" SERIAL NOT NULL,
    "name" character varying NOT NULL,
    "createAt" TIMESTAMP(0) NOT NULL DEFAULT now(),
    "updateAt" TIMESTAMP(0) NOT NULL DEFAULT now(),
    "branchId" integer,
    CONSTRAINT "PK_1a95bae3d12a9f21be6502e8a8b" PRIMARY KEY ("id")
);

CREATE TABLE "shift" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(0) NOT NULL,
    "endTime" TIMESTAMP(0) NOT NULL,
    "blocked" boolean NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(0) NOT NULL DEFAULT now(),
    "updateAt" TIMESTAMP(0) NOT NULL DEFAULT now(),
    "medicId" integer,
    "boxId" integer,
    CONSTRAINT "PK_53071a6485a1e9dc75ec3db54b9" PRIMARY KEY ("id")
);

CREATE TABLE "secretary" (
    "id" SERIAL NOT NULL,
    "name" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    "email" character varying NOT NULL,
    "password" character varying NOT NULL,
    "createAt" TIMESTAMP(0) NOT NULL DEFAULT now(),
    "updateAt" TIMESTAMP(0) NOT NULL DEFAULT now(),
    CONSTRAINT "UQ_dfad141abd9ea263d0e03a9bb98" UNIQUE ("email"),
    CONSTRAINT "PK_e6c85e70fd48750bbd8e34a553c" PRIMARY KEY ("id")
);

CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "name" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    "email" character varying NOT NULL,
    "password" character varying NOT NULL,
    "createAt" TIMESTAMP(0) NOT NULL DEFAULT now(),
    "updateAt" TIMESTAMP(0) NOT NULL DEFAULT now(),
    CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"),
    CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id")
);

ALTER TABLE "appointment" ADD CONSTRAINT "FK_5ce4c3130796367c93cd817948e" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "appointment" ADD CONSTRAINT "FK_a5f25934938ae7ee74dcdff5b6d" FOREIGN KEY ("shiftId") REFERENCES "shift"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "box" ADD CONSTRAINT "FK_43bad8a5900b00170681862917c" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "shift" ADD CONSTRAINT "FK_bc08a8160548b3c38461a43adc2" FOREIGN KEY ("medicId") REFERENCES "medic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "shift" ADD CONSTRAINT "FK_8bb2bbf74e98921530f49ddb523" FOREIGN KEY ("boxId") REFERENCES "box"("id") ON DELETE SET NULL ON UPDATE CASCADE;
