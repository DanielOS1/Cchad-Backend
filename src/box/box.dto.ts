import { IsString, IsNotEmpty, NotEquals, IsNumber } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoxDto {
  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  readonly name: string;

  @Field()
  @NotEquals(null)
  @IsNumber()
  readonly branchId: number;
}
