import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Schedule } from './schedule.entity';
import { Medic } from 'src/medic/medic.entity';
import { Box } from 'src/box/box.entity';
import { Slot } from 'src/slot/slot.entity';
import { CreateScheduleDto } from './schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepo: Repository<Schedule>,
    @InjectRepository(Medic) private medicRepo: Repository<Medic>,
    @InjectRepository(Box) private boxRepo: Repository<Box>,
  ) {}

  async create(payload: CreateScheduleDto): Promise<Schedule> {
    const medic = await this.medicRepo.findOneBy({ id: payload.medicId });
    if (!medic) {
      throw new NotFoundException(`Medic #${payload.medicId} not found`);
    }
    const box = await this.boxRepo.findOneBy({ id: payload.boxId });
    if (!box) {
      throw new NotFoundException(`Box #${payload.boxId} not found`);
    }
    const newSchedule = this.scheduleRepo.create(payload);
    newSchedule.medic = medic;
    newSchedule.box = box;
    return this.scheduleRepo.save(newSchedule).catch((error) => {
      throw new ConflictException(error.message);
    });
  }

  async delete(id: number): Promise<boolean> {
    const schedule = await this.scheduleRepo.findOneBy({ id });
    if (!schedule) {
      throw new NotFoundException('');
    }
    await this.scheduleRepo.remove(schedule);
    return true;
  }

  async publish(): Promise<void> {
    const schedules = await this.scheduleRepo.find({
      where: { public: false },
    });
    for (const schedule of schedules) {
      schedule.public = true;
    }
    if (schedules.length > 0) {
      await this.scheduleRepo.save(schedules).catch((error) => {
        throw new ConflictException(error.message);
      });
    }
  }

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
