import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Secretary } from './secretary.entity';
import { CreateSecretaryDto } from 'src/secretary/secretary.dto';

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
}
