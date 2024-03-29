import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';
import { Role } from './role.enum';

@InputType()
export class userAuthenticationDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  readonly email: string;
  @Field()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
  @Field()
  @IsNotEmpty()
  @IsString()
  readonly role: Role;
}
