import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Medic } from './medic.entity';
import { CreateMedicDto } from 'src/medic/medic.dto';
import { MedicService } from './medic.service';
import { Shift } from 'src/shift/shift.entity';

@Resolver(() => Medic)
export class MedicResolver {
  constructor(private readonly medicService: MedicService) {}

  @ResolveField('shifts', () => [Shift])
  async shifts(@Parent() medic: Medic) {
    const { id } = medic;
    return this.medicService.getShifts(id);
  }

  @Mutation(() => Medic)
  async registerMedic(@Args('input') input: CreateMedicDto) {
    return this.medicService.create(input);
  }
}
