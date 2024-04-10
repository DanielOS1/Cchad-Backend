import {
  Parent,
  ResolveField,
  Resolver,
  Mutation,
  Args,
} from '@nestjs/graphql';

import { Slot } from './slot.entity';
import { SlotService } from './slot.service';
import { Appointment } from 'src/appointment/appointment.entity';
import { Schedule } from 'src/schedule/schedule.entity';

@Resolver(() => Slot)
export class SlotResolver {
  constructor(private readonly slotService: SlotService) {}

  @ResolveField('appointments', () => [Appointment])
  async appointments(@Parent() slot: Slot) {
    const { id } = slot;
    return this.slotService.getAppointments(id);
  }

  @ResolveField('schedule', () => Schedule)
  async schedule(@Parent() slot: Slot) {
    const { id } = slot;
    return this.slotService.getSchedule(id);
  }

  @Mutation(() => Slot)
  /*@Roles(Role.Admin, Role.Secretary)
  @UseGuards(JwtAuthGuard, RolesGuard)*/
  async blockSlot(@Args('id') id: number): Promise<Slot> {
    return await this.slotService.update(id, { blocked: true });
  }

  @Mutation(() => Slot)
  /*@Roles(Role.Admin, Role.Secretary)
  @UseGuards(JwtAuthGuard, RolesGuard)*/
  async unlockSlot(@Args('id') id: number): Promise<Slot> {
    return await this.slotService.update(id, { blocked: false });
  }
}
