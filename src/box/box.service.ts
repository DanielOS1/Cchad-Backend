import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Box } from './box.entity';
import { Shift } from 'src/shift/shift.entity';
import { Branch } from 'src/branch/branch.entity';

@Injectable()
export class BoxService {
  constructor(
    @InjectRepository(Box)
    private boxRepo: Repository<Box>,
  ) {}

  async getShifts(id: number): Promise<Shift[]> {
    const box = await this.boxRepo.findOne({
      where: { id },
      relations: ['shifts'],
    });
    if (!box) {
      throw new NotFoundException('');
    }
    return box.shifts;
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
