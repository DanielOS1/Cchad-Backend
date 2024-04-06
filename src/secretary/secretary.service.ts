import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Secretary } from './secretary.entity';
import {
  CreateSecretaryDto,
  UpdateSecretaryDto,
} from 'src/secretary/secretary.dto';

@Injectable()
export class SecretaryService {
  constructor(
    @InjectRepository(Secretary)
    private secretaryRepo: Repository<Secretary>,
  ) {}

  async getSecretaryByEmail(email: string): Promise<Secretary> {
    const secretary = await this.secretaryRepo.findOneBy({ email });
    if (!secretary) {
      throw new NotFoundException('');
    }
    return secretary;
  }

  async create(payload: CreateSecretaryDto): Promise<Secretary> {
    const newSecretary = this.secretaryRepo.create(payload);
    return await this.secretaryRepo.save(newSecretary).catch((error) => {
      throw new ConflictException(error.message);
    });
  }

  async update(id: number, payload: UpdateSecretaryDto): Promise<Secretary> {
    const secretary = await this.secretaryRepo.findOneBy({ id });
    if (!secretary) {
      throw new NotFoundException('');
    }
    this.secretaryRepo.merge(secretary, payload);
    return await this.secretaryRepo.save(secretary).catch((error) => {
      throw new ConflictException(error.message);
    });
  }
}
