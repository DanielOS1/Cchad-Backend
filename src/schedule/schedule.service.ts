import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Schedule } from './schedule.entity';
import { Medic } from 'src/medic/medic.entity';
import { Box } from 'src/box/box.entity';
import { Slot } from 'src/slot/slot.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepo: Repository<Schedule>,
  ) {}

  async getMedic(id: number): Promise<Medic> {
    const schedule = await this.scheduleRepo.findOne({
      where: { id },
      relations: ['medic'],
    });
    if (!schedule) {
      throw new NotFoundException(``);
    }
    return schedule.medic;
  }

  async getSlots(id: number): Promise<Slot[]> {
    const schedule = await this.scheduleRepo.findOne({
      where: { id },
      relations: ['slots'],
    });
    if (!schedule) {
      throw new NotFoundException('');
    }
    return schedule.slots;
  }

  async getBox(id: number): Promise<Box> {
    const schedule = await this.scheduleRepo.findOne({
      where: { id },
      relations: ['box'],
    });
    if (!schedule) {
      throw new NotFoundException('');
    }
    return schedule.box;
  }
}
