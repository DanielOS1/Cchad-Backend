import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  NotEquals,
  IsNumber,
} from 'class-validator';

import { Role } from './role.enum';

@InputType()
export class userAuthenticationDto {
  @Field()
  @NotEquals(null)
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;
  @Field()
  @NotEquals(null)
  @IsNotEmpty()
  @IsString()
  readonly password: string;
  @Field()
  @NotEquals(null)
  @IsString()
  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: Role;
}

@InputType()
export class changePasswordDto {
  @Field()
  @NotEquals(null)
  @IsNumber()
  readonly userid: number;
  @Field()
  @NotEquals(null)
  @IsNotEmpty()
  @IsString()
  readonly newPassword: string;
  @Field()
  @NotEquals(null)
  @IsString()
  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: Role;
}
