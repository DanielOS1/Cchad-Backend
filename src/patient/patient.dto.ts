import {
  IsString,
  IsNotEmpty,
  NotEquals,
  IsEmail,
  IsEnum,
  IsDate,
  IsOptional,
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
  readonly rut: string;

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

@InputType()
export class CreatePatientBySecretaryOrAdminDto {
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
  readonly rut: string;

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

@InputType()
export class UpdatePatientDto {
  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @IsOptional()
  readonly name?: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @IsOptional()
  readonly lastName?: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @IsOptional()
  readonly password?: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @IsOptional()
  readonly rut?: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @IsEnum(patientGender)
  @IsOptional()
  readonly gender?: patientGender;

  @Field()
  @IsDate()
  @NotEquals(null)
  @IsOptional()
  readonly birthdate?: Date;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @IsOptional()
  readonly phone?: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @IsOptional()
  readonly address?: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @IsEnum(patientForecast)
  @IsOptional()
  readonly forecast?: patientForecast;
}
