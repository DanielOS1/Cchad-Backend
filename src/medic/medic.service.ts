import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medic } from './medic.entity';

import { CreateMedicDto, UpdateMedicDto } from './medic.dto';
import { Schedule } from 'src/schedule/schedule.entity';

@Injectable()
export class MedicService {
  constructor(
    @InjectRepository(Medic)
    private medicRepo: Repository<Medic>,
  ) {}

  async getAll(): Promise<Medic[]> {
    return this.medicRepo.find();
  }

  async getMedicById(id: number): Promise<Medic> {
    const medic = await this.medicRepo.findOneBy({ id });
    if (!medic) {
      throw new NotFoundException('');
    }
    return medic;
  }

  async getMedicByEmail(email: string): Promise<Medic> {
    const medic = await this.medicRepo.findOneBy({ email });
    if (!medic) {
      throw new NotFoundException('');
    }
    return medic;
  }

  async create(payload: CreateMedicDto): Promise<Medic> {
    const newMedic = this.medicRepo.create(payload);
    return await this.medicRepo.save(newMedic).catch((error) => {
      throw new ConflictException(error.message);
    });
  }

  async update(id: number, payload: UpdateMedicDto): Promise<Medic> {
    const medic = await this.medicRepo.findOneBy({ id });
    if (!medic) {
      throw new NotFoundException('');
    }
    this.medicRepo.merge(medic, payload);
    return await this.medicRepo.save(medic).catch((error) => {
      throw new ConflictException(error.message);
    });
  }

  async getSchedules(id: number): Promise<Schedule[]> {
    const medic = await this.medicRepo.findOne({
      where: { id },
      relations: ['schedules'],
    });
    if (!medic) {
      throw new NotFoundException('');
    }
    return medic.schedules;
  }
}
