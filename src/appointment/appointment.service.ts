import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Appointment, appointmentState } from './appointment.entity';
import { Patient } from 'src/patient/patient.entity';
import { Slot } from 'src/slot/slot.entity';
import {
  CreateAppointmentDto,
  RescheduleAppointmentDto,
  UpdateMedicalRecordDto,
} from './appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
    @InjectRepository(Slot) private slotRepo: Repository<Slot>,
  ) {}

  async medicalHistory(patientId: number): Promise<Appointment[]> {
    const patient = await this.patientRepo.findOne({
      where: { id: patientId },
      relations: ['appointments'],
    });
    if (!patient) {
      throw new NotFoundException('');
    }
    const appointments = await this.appointmentRepo.find({
      where: {
        patient: { id: patientId },
        state: appointmentState.Completada,
      },
      relations: ['patient'],
    });

    return appointments;
  }

  async create(payload: CreateAppointmentDto): Promise<Appointment> {
    const patient = await this.patientRepo.findOneBy({ id: payload.patientId });
    if (!patient) {
      throw new NotFoundException(`Patient #${payload.patientId} not found`);
    }
    const slot = await this.slotRepo.findOneBy({ id: payload.slotId });
    if (!slot) {
      throw new NotFoundException(`Slot #${payload.slotId} not found`);
    }
    const newAppointment = this.appointmentRepo.create(payload);
    newAppointment.patient = patient;
    newAppointment.slot = slot;
    return this.appointmentRepo.save(newAppointment).catch((error) => {
      throw new ConflictException(error.message);
    });
  }

  async reschedule(payload: RescheduleAppointmentDto): Promise<Appointment> {
    const appointment = await this.appointmentRepo.findOneBy({
      id: payload.appointmentId,
    });
    if (!appointment) {
      throw new NotFoundException(
        `Appointment #${payload.appointmentId} not found`,
      );
    }
    const newSlot = await this.slotRepo.findOneBy({ id: payload.newSlotId });
    if (!newSlot) {
      throw new NotFoundException(`Slot #${payload.newSlotId} not found`);
    }
    appointment.slot = newSlot;
    return await this.appointmentRepo.save(appointment).catch((error) => {
      throw new ConflictException(error.message);
    });
  }

  async confirm(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepo.findOneBy({ id });
    if (!appointment) {
      throw new NotFoundException('');
    }
    appointment.confirmed = true;
    return await this.appointmentRepo.save(appointment).catch((error) => {
      throw new ConflictException(error.message);
    });
  }

  async delete(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepo.findOneBy({ id });
    if (!appointment) {
      throw new NotFoundException('');
    }
    await this.appointmentRepo.remove(appointment);
    return appointment;
  }

  async updateMedicalRecord(
    id: number,
    payload: UpdateMedicalRecordDto,
  ): Promise<Appointment> {
    const appointment = await this.appointmentRepo.findOneBy({ id });
    if (!appointment) {
      throw new NotFoundException('');
    }
    this.appointmentRepo.merge(appointment, payload);
    return await this.appointmentRepo.save(appointment).catch((error) => {
      throw new ConflictException(error.message);
    });
  }

  async complete(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepo.findOneBy({ id });
    if (!appointment) {
      throw new NotFoundException('');
    }
    appointment.state = appointmentState.Completada;
    return await this.appointmentRepo.save(appointment).catch((error) => {
      throw new ConflictException(error.message);
    });
  }

  async getPatient(id: number): Promise<Patient> {
    const appointment = await this.appointmentRepo.findOne({
      where: { id },
      relations: ['patient'],
    });
    if (!appointment) {
      throw new NotFoundException('');
    }
    return appointment.patient;
  }

  async getSlot(id: number): Promise<Slot> {
    const appointment = await this.appointmentRepo.findOne({
      where: { id },
      relations: ['slot'],
    });
    if (!appointment) {
      throw new NotFoundException('');
    }
    return appointment.slot;
  }
}
