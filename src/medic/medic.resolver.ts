import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
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
  async schedules(@Parent() medic: Medic): Promise<Schedule[]> {
    const { id } = medic;
    return this.medicService.getSchedules(id);
  }

  @Query(() => [Medic])
  async medics(): Promise<Medic[]> {
    return this.medicService.getAll();
  }

  @Query(() => Medic)
  async medic(@Args('id', { type: () => Int }) id: number): Promise<Medic> {
    return this.medicService.getMedicById(id);
  }

  @Mutation(() => Medic)
  async registerMedic(@Args('input') input: CreateMedicDto): Promise<Medic> {
    return this.medicService.create(input);
  }
}
