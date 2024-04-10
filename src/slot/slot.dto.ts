import { IsOptional, IsBoolean } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateSlotDto {
  @Field()
  @IsBoolean()
  @IsOptional()
  readonly blocked?: boolean;

  @Field()
  @IsBoolean()
  @IsOptional()
  readonly enabled?: boolean;
}
