import {
  IsString,
  IsNotEmpty,
  NotEquals,
  IsEmail,
  IsEnum,
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
