import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Shift } from './shift.entity';
import { Appointment } from 'src/appointment/appointment.entity';
import { ShiftService } from './shift.service';
import { Medic } from 'src/medic/medic.entity';
import { Box } from 'src/box/box.entity';

@Resolver(() => Shift)
export class ShiftResolver {
  constructor(private readonly shiftService: ShiftService) {}

  @ResolveField('appointments', () => [Appointment])
  async appointments(@Parent() shift: Shift) {
    const { id } = shift;
    return this.shiftService.getAppointments(id);
  }

  @ResolveField('medic', () => Medic)
  async medic(@Parent() shift: Shift) {
    const { id } = shift;
    return this.shiftService.getMedic(id);
  }

  @ResolveField('box', () => Box)
  async box(@Parent() shift: Shift) {
    const { id } = shift;
    return this.shiftService.getBox(id);
  }
}
