import {
  IsString,
  IsNotEmpty,
  NotEquals,
  IsEmail,
  IsEnum,
  IsDate,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

import { patientGender } from './patient.entity';
import { patientForecast } from './patient.entity';

@InputType()
export class CreatePatientDto {
  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  readonly name: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  readonly lastName: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  readonly password: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @IsEnum(patientGender)
  readonly gender: patientGender;

  @Field()
  @IsDate()
  @NotEquals(null)
  readonly birthdate: Date;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  readonly phone: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  readonly address: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @IsEnum(patientForecast)
  readonly forecast: patientForecast;
}
