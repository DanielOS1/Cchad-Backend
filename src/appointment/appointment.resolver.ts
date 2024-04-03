import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Appointment } from './appointment.entity';
import { Patient } from 'src/patient/patient.entity';
import { Shift } from 'src/shift/shift.entity';
import { AppointmentService } from './appointment.service';

@Resolver(() => Appointment)
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService) {}

  @ResolveField('patient', () => Patient)
  async patient(@Parent() appointment: Appointment) {
    const { id } = appointment;
    return this.appointmentService.getPatient(id);
  }

  @ResolveField('shift', () => Shift)
  async shift(@Parent() appointment: Appointment) {
    const { id } = appointment;
    return this.appointmentService.getShift(id);
  }
}
