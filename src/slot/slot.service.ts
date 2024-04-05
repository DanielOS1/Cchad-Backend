import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Slot } from './slot.entity';
import { Schedule } from 'src/schedule/schedule.entity';
import { Appointment } from 'src/appointment/appointment.entity';

@Injectable()
export class SlotService {
  constructor(
    @InjectRepository(Slot)
    private slotRepo: Repository<Slot>,
  ) {}

  async getSchedule(id: number): Promise<Schedule> {
    const slot = await this.slotRepo.findOne({
      where: { id },
      relations: ['schedule'],
    });
    if (!slot) {
      throw new NotFoundException(``);
    }
    return slot.schedule;
  }

  async getAppointments(id: number): Promise<Appointment[]> {
    const slot = await this.slotRepo.findOne({
      where: { id },
      relations: ['appointments'],
    });
    if (!slot) {
      throw new NotFoundException('');
    }
    return slot.appointments;
  }
}
