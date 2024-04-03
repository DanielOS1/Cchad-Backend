import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
  ) {}

  async getPatient(id: number) {
    const appointment = await this.appointmentRepo.findOne({
      where: { id },
      relations: ['patient'],
    });
    if (!appointment) {
      throw new NotFoundException('');
    }
    return appointment.patient;
  }

  async getShift(id: number) {
    const appointment = await this.appointmentRepo.findOne({
      where: { id },
      relations: ['shift'],
    });
    if (!appointment) {
      throw new NotFoundException('');
    }
    return appointment.shift;
  }
}
