import {
  IsString,
  IsNotEmpty,
  NotEquals,
  IsNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

import { appointmentType } from './appointment.entity';

@InputType()
export class CreateAppointmentDto {
  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @IsEnum(appointmentType)
  readonly type: appointmentType;

  @Field()
  @NotEquals(null)
  @IsNumber()
  readonly patientId: number;

  @Field()
  @NotEquals(null)
  @IsNumber()
  readonly slotId: number;
}

@InputType()
export class RescheduleAppointmentDto {
  @Field()
  @NotEquals(null)
  @IsNumber()
  readonly appointmentId: number;

  @Field()
  @NotEquals(null)
  @IsNumber()
  readonly newSlotId: number;
}

@InputType()
export class UpdateMedicalRecordDto {
  @Field({ nullable: true })
  @NotEquals(null)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly diagnosis?: string;

  @Field({ nullable: true })
  @NotEquals(null)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly treatment?: string;

  @Field({ nullable: true })
  @NotEquals(null)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly prescriptionDrugs?: string;
}
