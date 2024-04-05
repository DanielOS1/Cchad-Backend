import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Appointment } from './appointment.entity';
import { Patient } from 'src/patient/patient.entity';
import { Slot } from 'src/slot/slot.entity';
import { AppointmentService } from './appointment.service';

@Resolver(() => Appointment)
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService) {}

  @ResolveField('patient', () => Patient)
  async patient(@Parent() appointment: Appointment) {
    const { id } = appointment;
    return this.appointmentService.getPatient(id);
  }

  @ResolveField('slot', () => Slot)
  async slot(@Parent() appointment: Appointment) {
    const { id } = appointment;
    return this.appointmentService.getSlot(id);
  }
}
