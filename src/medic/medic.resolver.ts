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
import { Schedule } from 'src/schedule/schedule.entity';

@Resolver(() => Medic)
export class MedicResolver {
  constructor(private readonly medicService: MedicService) {}

  @ResolveField('schedules', () => [Schedule])
  async schedules(@Parent() medic: Medic) {
    const { id } = medic;
    return this.medicService.getSchedules(id);
  }

  @Mutation(() => Medic)
  async registerMedic(@Args('input') input: CreateMedicDto) {
    return this.medicService.create(input);
  }
}
