-- Create table secretary
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

-- Create enum type medic_specialty_enum
CREATE TYPE "public"."medic_specialty_enum" AS ENUM('Cardiología', 'Dermatología', 'Gastroenterología', 'Neurología', 'Ginecología', 'Obstetricia', 'Oftalmología', 'Psiquiatría', 'Medicina Interna');

-- Create table medic
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

-- Create table branch
CREATE TABLE "branch" (
    "id" SERIAL NOT NULL,
    "name" character varying NOT NULL,
    "address" character varying NOT NULL,
    "opening_time" TIME WITH TIME ZONE NOT NULL,
    "closing_time" TIME WITH TIME ZONE NOT NULL,
    "enabled" boolean NOT NULL DEFAULT true,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id")
);

-- Create table box
CREATE TABLE "box" (
    "id" SERIAL NOT NULL,
    "name" character varying NOT NULL,
    "enabled" boolean NOT NULL DEFAULT true,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "branch_id" integer NOT NULL,
    CONSTRAINT "PK_1a95bae3d12a9f21be6502e8a8b" PRIMARY KEY ("id")
);

-- Create enum type patient_gender_enum
CREATE TYPE "public"."patient_gender_enum" AS ENUM('Masculino', 'Femenino');

-- Create enum type patient_forecast_enum
CREATE TYPE "public"."patient_forecast_enum" AS ENUM('FONASA', 'ISAPRE', 'Particular');

-- Create table patient
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

-- Create enum type appointment_state_enum
CREATE TYPE "public"."appointment_state_enum" AS ENUM('Reservada', 'Reprogramada', 'Cancelada', 'Completada');

-- Create enum type appointment_type_enum
CREATE TYPE "public"."appointment_type_enum" AS ENUM('Consulta', 'Control', 'Procedimiento');

-- Create table appointment
CREATE TABLE "appointment" (
    "id" SERIAL NOT NULL,
    "state" "public"."appointment_state_enum" NOT NULL DEFAULT 'Reservada',
    "confirmed" boolean NOT NULL DEFAULT false,
    "type" "public"."appointment_type_enum" NOT NULL,
    "diagnosis" character varying,
    "treatment" character varying,
    "prescription_drugs" character varying,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "patient_id" integer NOT NULL,
    "slot_id" integer NOT NULL,
    CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id")
);

-- Create table slot
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

-- Create table schedule
CREATE TABLE "schedule" (
    "id" SERIAL NOT NULL,
    "time" tstzrange NOT NULL,
    "slot_duration" interval NOT NULL,
    "public" boolean NOT NULL DEFAULT false,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "medic_id" integer NOT NULL,
    "box_id" integer NOT NULL,
    CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id")
);

-- Create table admin
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

-- Add Foreign Key constraints
ALTER TABLE "box" ADD CONSTRAINT "FK_f6750f8b774a4260313213a46ea" FOREIGN KEY ("branch_id") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "appointment" ADD CONSTRAINT "FK_86b3e35a97e289071b4785a1402" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "appointment" ADD CONSTRAINT "FK_9f9596ccb3fe8e63358d9bfcbdb" FOREIGN KEY ("slot_id") REFERENCES "slot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "slot" ADD CONSTRAINT "FK_66a32e69218e8904c3f98ab9232" FOREIGN KEY ("schedule_id") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "schedule" ADD CONSTRAINT "FK_33851dfb15a44ac8cf2e592e951" FOREIGN KEY ("medic_id") REFERENCES "medic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "schedule" ADD CONSTRAINT "FK_840dccc6f12adb02c27b2bb3ab3" FOREIGN KEY ("box_id") REFERENCES "box"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;


CREATE OR REPLACE FUNCTION create_slots()
RETURNS TRIGGER AS $$
DECLARE
    block_range tstzrange;
    num_blocks FLOAT; -- Cambiado a FLOAT para manejar fracciones de bloques
BEGIN
    num_blocks := EXTRACT(EPOCH FROM upper(NEW.time) - lower(NEW.time)) / EXTRACT(EPOCH FROM NEW.slot_duration);

    -- Validar si num_blocks es un número entero
    IF num_blocks = ROUND(num_blocks) THEN
        FOR i IN 0..num_blocks-1 LOOP
            block_range := tstzrange(lower(NEW.time) + (i*NEW.slot_duration), lower(NEW.time) + ((i+1)*NEW.slot_duration), '[]');
            INSERT INTO "slot" ("schedule_id", "time")
            VALUES (NEW.id, block_range);
        END LOOP;
    ELSE
        RAISE EXCEPTION 'El número de bloques no es un entero';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER schedule_after_insert
AFTER INSERT ON "schedule"
FOR EACH ROW
EXECUTE FUNCTION create_slots();



CREATE OR REPLACE FUNCTION validate_schedule_overlap()
RETURNS TRIGGER AS $$
DECLARE
    branch_opening_time TIME WITH TIME ZONE;
    branch_closing_time TIME WITH TIME ZONE;
    time_range tstzrange;
    medic_enabled BOOLEAN;
    box_enabled BOOLEAN;
    branch_enabled BOOLEAN;
BEGIN
     -- Verificar si el médico está habilitado
    SELECT enabled INTO medic_enabled FROM medic WHERE id = NEW.medic_id;
    IF NOT medic_enabled THEN
        RAISE EXCEPTION 'El médico no está habilitado';
    END IF;

    -- Verificar si el branch asociado al box está habilitado
    SELECT enabled INTO branch_enabled FROM branch WHERE id = (SELECT branch_id FROM box WHERE id = NEW.box_id);
    IF NOT branch_enabled THEN
        RAISE EXCEPTION 'La sucursal del box no está habilitada';
    END IF;

    -- Verificar si el box está habilitado
    SELECT enabled INTO box_enabled FROM box WHERE id = NEW.box_id;
    IF NOT box_enabled THEN
        RAISE EXCEPTION 'El box no está habilitado';
    END IF;

    SELECT opening_time, closing_time INTO branch_opening_time, branch_closing_time
    FROM branch b
    INNER JOIN box bx ON b.id = bx.branch_id
    WHERE bx.id = NEW.box_id;

    time_range := tstzrange(lower(NEW.time)::timestamp with time zone::date + branch_opening_time,
                             upper(NEW.time)::timestamp with time zone::date + branch_closing_time);

    -- Validar solapamiento con el horario de atención del branch
    IF NOT (lower(NEW.time) >= lower(time_range) AND upper(NEW.time) <= upper(time_range)) THEN
        RAISE EXCEPTION 'El horario debe estar dentro del horario de atención de la sucursal del box.';
    END IF;

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
        RAISE EXCEPTION 'No se puede modificar la duración de un turno, solo eliminar por completo y sólo si no hay citas registradas. Puede bloquear los bloques que necesite.';
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
    schedule_duration interval;
BEGIN
    -- Obtenemos la duración total del horario (schedule)
    SELECT upper("time") - lower("time")
    INTO schedule_duration
    FROM schedule
    WHERE id = NEW.schedule_id;

    -- Obtenemos la suma de las duraciones de tiempo de todos los slots asociados al horario
    SELECT COALESCE(SUM(upper("time") - lower("time")), '00:00:00'::interval)
    INTO total_range
    FROM slot
    WHERE schedule_id = NEW.schedule_id;

    -- Si la suma de las duraciones de los slots es mayor o igual a la duración total del horario, generamos un error
    IF total_range >= schedule_duration THEN
        RAISE EXCEPTION 'El horario ya tiene todos sus bloques asignados';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Creamos el trigger
CREATE TRIGGER before_insert_slot
BEFORE INSERT ON "slot"
FOR EACH ROW
EXECUTE FUNCTION check_slot_sum();



CREATE OR REPLACE FUNCTION check_slot_changes()
RETURNS TRIGGER AS $$
BEGIN

    IF NEW.time <> OLD.time OR NEW.schedule_id <> OLD.schedule_id THEN
        RAISE EXCEPTION 'Los bloques no pueden cambiarse de horario ni modificar su rango de tiempo';
    END IF;
    RETURN NEW;

    IF NEW.blocked = true AND EXISTS (
        SELECT 1 FROM appointment WHERE slot_id = NEW.id
    ) THEN
        RAISE EXCEPTION 'No se puede bloquear este bloque porque tiene citas asociadas';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER slot_check_changes
BEFORE UPDATE ON "slot"
FOR EACH ROW
EXECUTE FUNCTION check_slot_changes();



INSERT INTO "branch" ("name", "address", "opening_time", "closing_time")
VALUES ('UCN Campus Guayacan', 'Larrondo 1281', '08:00:00-04', '20:00:00-04');

INSERT INTO "box" ("name", "branch_id") VALUES ('Box1', 1);
INSERT INTO "box" ("name", "branch_id") VALUES ('Box2', 1);
INSERT INTO "box" ("name", "enabled", "branch_id") VALUES ('Box3', false, 1);
INSERT INTO "box" ("name", "branch_id") VALUES ('Box4', 1);

INSERT INTO "medic" ("name", "last_name", "email", "password", "specialty")
VALUES ('John', 'Doe', 'johndoe@example.com', 'password123', 'Cardiología');
INSERT INTO "medic" ("name", "last_name", "email", "password", "specialty")
VALUES ('Jane', 'Smith', 'janesmith@example.com', 'securepassword456', 'Neurología');

INSERT INTO "schedule" ("time", "slot_duration", "medic_id", "box_id")
VALUES (TSTZRANGE('2024-04-09 08:00:00-04', '2024-04-09 12:00:00-04'), '01:00:00', 1, 1);
