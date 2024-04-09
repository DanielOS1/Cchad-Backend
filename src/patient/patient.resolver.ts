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
import { MailService } from '../mail/mail.service';

@Resolver(() => Patient)
export class PatientResolver {
  constructor(
    private readonly patientService: PatientService,
    private readonly mailService: MailService,
  ) {}

  @ResolveField('appointments', () => [Appointment])
  async appointments(@Parent() patient: Patient) {
    const { id } = patient;
    return this.patientService.getAppointments(id);
  }

  @Mutation(() => Patient)
  async registerPatient(@Args('input') input: CreatePatientDto) {
    const newPatient: Patient = await this.patientService.create(input);
    /*if (newPatient) {
      this.mailService.registeredPatient(
        newPatient.name,
        newPatient.lastName,
        newPatient.email,
      );
    }*/
    return newPatient;
  }
}
