import {
  IsString,
  IsNotEmpty,
  NotEquals,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSecretaryDto {
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
}

@InputType()
export class registerSecretaryDto {
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
}

@InputType()
export class UpdateSecretaryDto {
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
}
