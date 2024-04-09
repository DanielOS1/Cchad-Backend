-- Create the "secretary" table
CREATE TABLE "secretary" (
    "id" SERIAL NOT NULL,
    "name" character varying NOT NULL,
    "last_name" character varying NOT NULL,
    "email" character varying NOT NULL,
    "password" character varying NOT NULL,
    "enabled" boolean NOT NULL DEFAULT true,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT "UQ_dfad141abd9ea263d0e03a9bb98" UNIQUE ("email"),
    CONSTRAINT "PK_e6c85e70fd48750bbd8e34a553c" PRIMARY KEY ("id")
);

-- Create the enum type "patient_gender_enum"
CREATE TYPE "public"."patient_gender_enum" AS ENUM('Masculino', 'Femenino');

-- Create the enum type "patient_forecast_enum"
CREATE TYPE "public"."patient_forecast_enum" AS ENUM('FONASA', 'ISAPRE', 'Particular');

-- Create the "patient" table
CREATE TABLE "patient" (
    "id" SERIAL NOT NULL,
    "name" character varying NOT NULL,
    "last_name" character varying NOT NULL,
    "rut" character varying NOT NULL,
    "email" character varying NOT NULL,
    "password" character varying NOT NULL,
    "gender" "public"."patient_gender_enum" NOT NULL,
    "birthdate" TIMESTAMP(0) NOT NULL,
    "phone" character varying NOT NULL,
    "address" character varying NOT NULL,
    "forecast" "public"."patient_forecast_enum" NOT NULL,
    "enabled" boolean NOT NULL DEFAULT true,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT "UQ_35c81f692a3381882be74636a77" UNIQUE ("rut"),
    CONSTRAINT "UQ_2c56e61f9e1afb07f28882fcebb" UNIQUE ("email"),
    CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id")
);

-- Create the enum type "appointment_state_enum"
CREATE TYPE "public"."appointment_state_enum" AS ENUM('Reservada', 'Reprogramada', 'Cancelada', 'Completada');

-- Create the enum type "appointment_type_enum"
CREATE TYPE "public"."appointment_type_enum" AS ENUM('Consulta', 'Control', 'Procedimiento');

-- Create the "appointment" table
CREATE TABLE "appointment" (
    "id" SERIAL NOT NULL,
    "state" "public"."appointment_state_enum" NOT NULL,
    "confirmed" boolean NOT NULL DEFAULT false,
    "type" "public"."appointment_type_enum" NOT NULL,
    "diagnosis" character varying NOT NULL,
    "treatment" character varying NOT NULL,
    "prescription_drugs" character varying NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "patient_id" integer NOT NULL,
    "slot_id" integer NOT NULL,
    CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id")
);

-- Create the enum type "medic_specialty_enum"
CREATE TYPE "public"."medic_specialty_enum" AS ENUM('Cardiología', 'Dermatología', 'Gastroenterología', 'Neurología', 'Ginecología', 'Obstetricia', 'Oftalmología', 'Psiquiatría', 'Medicina Interna');

-- Create the "medic" table
CREATE TABLE "medic" (
    "id" SERIAL NOT NULL,
    "name" character varying NOT NULL,
    "last_name" character varying NOT NULL,
    "email" character varying NOT NULL,
    "password" character varying NOT NULL,
    "specialty" "public"."medic_specialty_enum" NOT NULL,
    "enabled" boolean NOT NULL DEFAULT true,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT "UQ_1666724850c1c2eb03bcebcd20a" UNIQUE ("email"),
    CONSTRAINT "PK_6fa7ab55cb3c448fde4ce548270" PRIMARY KEY ("id")
);

-- Create the "branch" table
CREATE TABLE "branch" (
    "id" SERIAL NOT NULL,
    "name" character varying NOT NULL,
    "address" character varying NOT NULL,
    "enabled" boolean NOT NULL DEFAULT true,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id")
);

-- Create the "box" table
CREATE TABLE "box" (
    "id" SERIAL NOT NULL,
    "name" character varying NOT NULL,
    "enabled" boolean NOT NULL DEFAULT true,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "branch_id" integer NOT NULL,
    CONSTRAINT "PK_1a95bae3d12a9f21be6502e8a8b" PRIMARY KEY ("id")
);

-- Create the "schedule" table
CREATE TABLE "schedule" (
    "id" SERIAL NOT NULL,
    "time" tstzrange NOT NULL,
    "slot_duration" interval NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "medic_id" integer NOT NULL,
    "box_id" integer NOT NULL,
    CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id")
);

-- Create the "slot" table
CREATE TABLE "slot" (
    "id" SERIAL NOT NULL,
    "time" tstzrange NOT NULL,
    "blocked" boolean NOT NULL DEFAULT false,
    "enabled" boolean NOT NULL DEFAULT true,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "schedule_id" integer NOT NULL,
    CONSTRAINT "PK_5b1f733c4ba831a51f3c114607b" PRIMARY KEY ("id")
);

-- Create the "admin" table
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "name" character varying NOT NULL,
    "last_name" character varying NOT NULL,
    "email" character varying NOT NULL,
    "password" character varying NOT NULL,
    "enabled" boolean NOT NULL DEFAULT true,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"),
    CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id")
);

-- Add foreign key constraints
ALTER TABLE "appointment" ADD CONSTRAINT "FK_86b3e35a97e289071b4785a1402" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "appointment" ADD CONSTRAINT "FK_9f9596ccb3fe8e63358d9bfcbdb" FOREIGN KEY ("slot_id") REFERENCES "slot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "box" ADD CONSTRAINT "FK_f6750f8b774a4260313213a46ea" FOREIGN KEY ("branch_id") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "schedule" ADD CONSTRAINT "FK_33851dfb15a44ac8cf2e592e951" FOREIGN KEY ("medic_id") REFERENCES "medic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "schedule" ADD CONSTRAINT "FK_840dccc6f12adb02c27b2bb3ab3" FOREIGN KEY ("box_id") REFERENCES "box"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "slot" ADD CONSTRAINT "FK_66a32e69218e8904c3f98ab9232" FOREIGN KEY ("schedule_id") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION;



CREATE OR REPLACE FUNCTION create_blocks()
RETURNS TRIGGER AS $$
DECLARE
    block_range tstzrange;
	  num_blocks INTEGER;
BEGIN

    num_blocks := EXTRACT(EPOCH FROM upper(NEW.time) - lower(NEW.time)) / EXTRACT(EPOCH FROM NEW.slot_duration);

    FOR i IN 0..num_blocks-1 LOOP
        block_range := tstzrange(lower(NEW.time) + (i*NEW.slot_duration), lower(NEW.time) + ((i+1)*NEW.slot_duration), '[]');
        INSERT INTO "slot" ("schedule_id", "time")
        VALUES (NEW.id, block_range);
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER schedule_after_insert
AFTER INSERT ON "schedule"
FOR EACH ROW
EXECUTE FUNCTION create_blocks();



CREATE OR REPLACE FUNCTION validate_schedule_overlap()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM schedule s
        WHERE NEW.medic_id = s.medic_id
        AND tstzrange(NEW.time) && s.time
        AND s.id != NEW.id
    ) THEN
        RAISE EXCEPTION 'El médico ya tiene otro horario registrado al mismo tiempo';
    END IF;

    IF EXISTS (
        SELECT 1
        FROM schedule s
        WHERE NEW.box_id = s.box_id
        AND tstzrange(NEW.time) && s.time
        AND s.id != NEW.id
    ) THEN
        RAISE EXCEPTION 'El box está siendo utilizado en otro horario al mismo tiempo';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER schedule_overlap_trigger
BEFORE INSERT OR UPDATE ON schedule
FOR EACH ROW
EXECUTE FUNCTION validate_schedule_overlap();



CREATE OR REPLACE FUNCTION prevent_time_update()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW."time" <> OLD."time" THEN
        RAISE EXCEPTION 'No se puede modificar la duración de un turno, solo eliminar por completo y sólo si no hay citas registradas.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_time_update_trigger
BEFORE UPDATE ON "schedule"
FOR EACH ROW
EXECUTE FUNCTION prevent_time_update();



CREATE OR REPLACE FUNCTION prevent_delete_schedule_with_appointments()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM slot
        WHERE schedule_id = OLD.id
          AND EXISTS (
              SELECT 1
              FROM appointment
              WHERE appointment.slot_id = slot.id
          )
    ) THEN
        RAISE EXCEPTION 'No se pueden eliminar horarios que tengan citas registradas.';
    END IF;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_delete_schedule_trigger
BEFORE DELETE ON "schedule"
FOR EACH ROW
EXECUTE FUNCTION prevent_delete_schedule_with_appointments();



CREATE OR REPLACE FUNCTION recreate_slot()
RETURNS TRIGGER AS $$
BEGIN

    IF EXISTS (SELECT 1 FROM schedule WHERE id = OLD.schedule_id) THEN

        INSERT INTO slot ("time", "blocked", "enabled", "schedule_id")
        VALUES (OLD.time, OLD.blocked, OLD.enabled, OLD.schedule_id);
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER slot_deleted_trigger
AFTER DELETE ON slot
FOR EACH ROW
EXECUTE FUNCTION recreate_slot();


CREATE OR REPLACE FUNCTION check_slot_sum()
RETURNS TRIGGER AS $$
DECLARE
    total_range interval;
BEGIN
    SELECT SUM(upper(time)-lower(time))
    INTO total_range
    FROM slot
    WHERE schedule_id = NEW.schedule_id;

    IF total_range >= (SELECT slot_duration FROM schedule WHERE id = NEW.schedule_id) THEN
        RAISE EXCEPTION 'El horario ya tiene sus bloques asignados';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_slot
BEFORE INSERT ON slot
FOR EACH ROW
EXECUTE FUNCTION check_slot_sum();



CREATE OR REPLACE FUNCTION check_slot_changes()
RETURNS TRIGGER AS $$
BEGIN

    IF NEW."time" <> OLD."time" OR NEW."schedule_id" <> OLD."schedule_id" THEN
        RAISE EXCEPTION 'Los bloques no pueden cambiarse de horario ni modificar su rango de tiempo';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER slot_check_changes
BEFORE UPDATE ON "slot"
FOR EACH ROW
EXECUTE FUNCTION check_slot_changes();

