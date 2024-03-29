import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
  ) {}

  async getPatientByEmail(email: string): Promise<Patient> {
    const patient = await this.patientRepo.findOneBy({ email });
    if (!patient) {
      throw new NotFoundException(`Patient with email ${email} not found`);
    }
    return patient;
  }
}
