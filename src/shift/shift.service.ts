import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Shift } from './shift.entity';
import { Medic } from 'src/medic/medic.entity';
import { Appointment } from 'src/appointment/appointment.entity';
import { Box } from 'src/box/box.entity';

@Injectable()
export class ShiftService {
  constructor(
    @InjectRepository(Shift)
    private shiftRepo: Repository<Shift>,
  ) {}

  async getMedic(id: number): Promise<Medic> {
    const shift = await this.shiftRepo.findOne({
      where: { id },
      relations: ['medic'],
    });
    if (!shift) {
      throw new NotFoundException(`Shift #${id} not found`);
    }
    return shift.medic;
  }

  async getAppointments(id: number): Promise<Appointment[]> {
    const shift = await this.shiftRepo.findOne({
      where: { id },
      relations: ['appointments'],
    });
    if (!shift) {
      throw new NotFoundException('');
    }
    return shift.appointments;
  }

  async getBox(id: number): Promise<Box> {
    const shift = await this.shiftRepo.findOne({
      where: { id },
      relations: ['box'],
    });
    if (!shift) {
      throw new NotFoundException('');
    }
    return shift.box;
  }
}
