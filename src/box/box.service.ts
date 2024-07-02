import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Box } from './box.entity';
import { Schedule } from 'src/schedule/schedule.entity';
import { Branch } from 'src/branch/branch.entity';
import { CreateBoxDto } from './box.dto';

@Injectable()
export class BoxService {
  constructor(
    @InjectRepository(Box)
    private boxRepo: Repository<Box>,
    @InjectRepository(Branch)
    private branchRepo: Repository<Branch>,
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

  async create(payload: CreateBoxDto): Promise<Box> {
    const branch = await this.branchRepo.findOneBy({ id: payload.branchId });
    if (!branch) {
      throw new NotFoundException(`Branch #${payload.branchId} not found`);
    }
    const newBox = this.boxRepo.create(payload);
    newBox.branch = branch;
    return this.boxRepo.save(newBox).catch((error) => {
      throw new ConflictException(error.message);
    });
  }

  async disable(id: number): Promise<Box> {
    const box = await this.boxRepo.findOneBy({ id });
    if (!box) {
      throw new NotFoundException('');
    }
    box.enabled = false;
    return await this.boxRepo.save(box).catch((error) => {
      throw new ConflictException(error.message);
    });
  }

  async enable(id: number): Promise<Box> {
    const box = await this.boxRepo.findOneBy({ id });
    if (!box) {
      throw new NotFoundException('');
    }
    box.enabled = true;
    return await this.boxRepo.save(box).catch((error) => {
      throw new ConflictException(error.message);
    });
  }

  async delete(id: number): Promise<boolean> {
    const box = await this.boxRepo.findOneBy({ id });
    if (!box) {
      throw new NotFoundException('');
    }
    await this.boxRepo.remove(box);
    return true;
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
