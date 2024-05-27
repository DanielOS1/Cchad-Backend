import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Appointment } from './appointment.entity';
import { Patient } from 'src/patient/patient.entity';
import { Slot } from 'src/slot/slot.entity';
import { AppointmentService } from './appointment.service';
import {
  CreateAppointmentDto,
  RescheduleAppointmentDto,
  UpdateMedicalRecordDto,
} from './appointment.dto';

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

  @Query(() => [Appointment])
  async medicalHistory(
    @Args('patientId', { type: () => Int }) patientId: number,
  ): Promise<Appointment[]> {
    return this.appointmentService.medicalHistory(patientId);
  }

  @Mutation(() => Appointment)
  /*@Roles(Role.Patient, Role.Secretary, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)*/
  async bookAppointment(
    @Args('input') input: CreateAppointmentDto,
  ): Promise<Appointment> {
    return await this.appointmentService.create(input);
  }

  @Mutation(() => Appointment)
  /*@Roles(Role.Patient, Role.Secretary, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)*/
  async rescheduleAppointment(
    @Args('input') input: RescheduleAppointmentDto,
  ): Promise<Appointment> {
    return await this.appointmentService.reschedule(input);
  }

  @Mutation(() => Boolean)
  /*@Roles(Role.Patient, Role.Secretary, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)*/
  async cancelAppointment(@Args('id') id: number): Promise<boolean> {
    const appointment = await this.appointmentService.delete(id);
    if (appointment) {
      return true;
    }
  }

  @Mutation(() => Appointment)
  /*@Roles(Role.Patient, Role.Secretary, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)*/
  async confirmAppointment(@Args('id') id: number): Promise<Appointment> {
    return await this.appointmentService.confirm(id);
  }

  @Mutation(() => Appointment)
  /*@Roles(Role.Patient, Role.Secretary, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)*/
  async updateMedicalRecord(
    @Args('id') id: number,
    @Args('input') input: UpdateMedicalRecordDto,
  ): Promise<Appointment> {
    return await this.appointmentService.updateMedicalRecord(id, input);
  }

  @Mutation(() => Appointment)
  /*@Roles(Role.Patient, Role.Secretary, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)*/
  async completeAppointment(@Args('id') id: number): Promise<Appointment> {
    return await this.appointmentService.complete(id);
  }
}
