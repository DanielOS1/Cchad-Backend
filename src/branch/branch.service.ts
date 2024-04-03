import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Branch } from './branch.entity';
import { Box } from 'src/box/box.entity';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private branchRepo: Repository<Branch>,
  ) {}

  async getBoxes(id: number): Promise<Box[]> {
    const branch = await this.branchRepo.findOne({
      where: { id },
      relations: ['boxes'],
    });
    if (!branch) {
      throw new NotFoundException('');
    }
    return branch.boxes;
  }
}
