import { IsString, IsNotEmpty, NotEquals, Validate } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

import { IsValidTime } from 'src/validators/isValidTime';

@InputType()
export class CreateBranchDto {
  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  readonly name: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  readonly address: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @Validate(IsValidTime)
  readonly openingTime: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @Validate(IsValidTime)
  readonly closingTime: string;
}
