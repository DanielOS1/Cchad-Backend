import {
  IsString,
  IsNotEmpty,
  NotEquals,
  IsEmail,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

import { medicSpecialty } from './medic.entity';

@InputType()
export class CreateMedicDto {
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
  @IsEnum(medicSpecialty)
  readonly specialty: medicSpecialty;
}

@InputType()
export class registerMedicDto {
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
  @IsEnum(medicSpecialty)
  readonly specialty: medicSpecialty;
}

@InputType()
export class UpdateMedicDto {
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
  @IsEnum(medicSpecialty)
  @IsOptional()
  readonly specialty?: medicSpecialty;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @IsOptional()
  readonly password?: string;
}
