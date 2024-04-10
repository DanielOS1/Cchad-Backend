import {
  IsString,
  IsNotEmpty,
  NotEquals,
  IsNumber,
  Validate,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { IsValidTimeRange } from 'src/validators/isValidTimeRange';
import { IsValidTimeInterval } from 'src/validators/isValidTimeInterval';

@InputType()
export class CreateScheduleDto {
  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @Validate(IsValidTimeRange)
  readonly time: string;

  @Field()
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @Validate(IsValidTimeInterval)
  readonly slotDuration: string;

  @Field()
  @NotEquals(null)
  @IsNumber()
  readonly medicId: number;

  @Field()
  @NotEquals(null)
  @IsNumber()
  readonly boxId: number;
}
