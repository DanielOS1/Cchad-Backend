import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Schedule } from './schedule.entity';
import { ScheduleService } from './schedule.service';
import { Medic } from 'src/medic/medic.entity';
import { Box } from 'src/box/box.entity';
import { Slot } from 'src/slot/slot.entity';
import { CreateScheduleDto } from './schedule.dto';

@Resolver(() => Schedule)
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) {}

  @ResolveField('slots', () => [Slot])
  async slots(@Parent() schedule: Schedule): Promise<Slot[]> {
    const { id } = schedule;
    return this.scheduleService.getSlots(id);
  }

  @ResolveField('medic', () => Medic)
  async medic(@Parent() schedule: Schedule): Promise<Medic> {
    const { id } = schedule;
    return this.scheduleService.getMedic(id);
  }

  @ResolveField('box', () => Box)
  async box(@Parent() schedule: Schedule): Promise<Box> {
    const { id } = schedule;
    return this.scheduleService.getBox(id);
  }

  @Mutation(() => Schedule)
  /*@Roles(Role.Admin, Role.Secretary)
  @UseGuards(JwtAuthGuard, RolesGuard)*/
  async createMedicSchedule(
    @Args('input') input: CreateScheduleDto,
  ): Promise<Schedule> {
    return await this.scheduleService.create(input);
  }

  @Mutation(() => Boolean)
  /*@Roles(Role.Admin, Role.Secretary)
  @UseGuards(JwtAuthGuard, RolesGuard)*/
  async deleteMedicSchedule(@Args('id') id: number): Promise<boolean> {
    return await this.scheduleService.delete(id);
  }
}
