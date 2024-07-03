import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Branch } from './branch.entity';
import { Box } from 'src/box/box.entity';
import { CreateBranchDto } from './branch.dto';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private branchRepo: Repository<Branch>,
  ) {}

  async getAll(): Promise<Branch[]> {
    return this.branchRepo.find();
  }

  async getBranchById(id: number): Promise<Branch> {
    const branch = await this.branchRepo.findOneBy({ id });
    if (!branch) {
      throw new NotFoundException('');
    }
    return branch;
  }

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

  async create(payload: CreateBranchDto): Promise<Branch> {
    const newBranch = this.branchRepo.create(payload);
    return this.branchRepo.save(newBranch).catch((error) => {
      throw new ConflictException(error.message);
    });
  }

  async disable(id: number): Promise<Branch> {
    const branch = await this.branchRepo.findOneBy({ id });
    if (!branch) {
      throw new NotFoundException('');
    }
    branch.enabled = false;
    return await this.branchRepo.save(branch).catch((error) => {
      throw new ConflictException(error.message);
    });
  }

  async enable(id: number): Promise<Branch> {
    const branch = await this.branchRepo.findOneBy({ id });
    if (!branch) {
      throw new NotFoundException('');
    }
    branch.enabled = true;
    return await this.branchRepo.save(branch).catch((error) => {
      throw new ConflictException(error.message);
    });
  }

  async delete(id: number): Promise<boolean> {
    const branch = await this.branchRepo.findOneBy({ id });
    if (!branch) {
      throw new NotFoundException('');
    }
    await this.branchRepo.remove(branch);
    return true;
  }
}
