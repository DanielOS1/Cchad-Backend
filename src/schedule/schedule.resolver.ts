import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Schedule } from './schedule.entity';
import { ScheduleService } from './schedule.service';
import { Medic } from 'src/medic/medic.entity';
import { Box } from 'src/box/box.entity';
import { Slot } from 'src/slot/slot.entity';

@Resolver(() => Schedule)
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) {}

  @ResolveField('slots', () => [Slot])
  async slots(@Parent() schedule: Schedule) {
    const { id } = schedule;
    return this.scheduleService.getSlots(id);
  }

  @ResolveField('medic', () => Medic)
  async medic(@Parent() schedule: Schedule) {
    const { id } = schedule;
    return this.scheduleService.getMedic(id);
  }

  @ResolveField('box', () => Box)
  async box(@Parent() schedule: Schedule) {
    const { id } = schedule;
    return this.scheduleService.getBox(id);
  }
}
