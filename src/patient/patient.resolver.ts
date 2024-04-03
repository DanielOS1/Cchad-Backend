import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Patient } from './patient.entity';
import { CreatePatientDto } from './patient.dto';
import { PatientService } from './patient.service';
import { Appointment } from 'src/appointment/appointment.entity';

@Resolver(() => Patient)
export class PatientResolver {
  constructor(private readonly patientService: PatientService) {}

  @ResolveField('appointments', () => [Appointment])
  async appointments(@Parent() patient: Patient) {
    const { id } = patient;
    return this.patientService.getAppointments(id);
  }

  @Mutation(() => Patient)
  async registerPatient(@Args('input') input: CreatePatientDto) {
    return this.patientService.create(input);
  }
}
