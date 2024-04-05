import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Appointment } from './appointment.entity';
import { Patient } from 'src/patient/patient.entity';
import { Slot } from 'src/slot/slot.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
  ) {}

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
