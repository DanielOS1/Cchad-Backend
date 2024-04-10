import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Box } from './box.entity';
import { Schedule } from 'src/schedule/schedule.entity';
import { Branch } from 'src/branch/branch.entity';

@Injectable()
export class BoxService {
  constructor(
    @InjectRepository(Box)
    private boxRepo: Repository<Box>,
  ) {}

  async getAll(): Promise<Box[]> {
    return this.boxRepo.find();
  }

  async getBoxById(id: number): Promise<Box> {
    const box = await this.boxRepo.findOneBy({ id });
    if (!box) {
      throw new NotFoundException('');
    }
    return box;
  }

  async getSchedules(id: number): Promise<Schedule[]> {
    const box = await this.boxRepo.findOne({
      where: { id },
      relations: ['schedules'],
    });
    if (!box) {
      throw new NotFoundException('');
    }
    return box.schedules;
  }

  async getBranch(id: number): Promise<Branch> {
    const box = await this.boxRepo.findOne({
      where: { id },
      relations: ['branch'],
    });
    if (!box) {
      throw new NotFoundException('');
    }
    return box.branch;
  }
}
