import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Patient } from './patient.entity';
import { CreatePatientDto, UpdatePatientDto } from './patient.dto';
import { Appointment } from 'src/appointment/appointment.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
  ) {}

  async getPatientByEmail(email: string): Promise<Patient> {
    const patient = await this.patientRepo.findOneBy({ email });
    if (!patient) {
      throw new NotFoundException('');
    }
    return patient;
  }

  async create(payload: CreatePatientDto): Promise<Patient> {
    const newPatient = this.patientRepo.create(payload);
    return await this.patientRepo.save(newPatient).catch((error) => {
      throw new ConflictException(error.message);
    });
  }

  async update(id: number, payload: UpdatePatientDto): Promise<Patient> {
    const patient = await this.patientRepo.findOneBy({ id });
    if (!patient) {
      throw new NotFoundException('');
    }
    this.patientRepo.merge(patient, payload);
    return await this.patientRepo.save(patient).catch((error) => {
      throw new ConflictException(error.message);
    });
  }

  async getAppointments(id: number): Promise<Appointment[]> {
    const patient = await this.patientRepo.findOne({
      where: { id },
      relations: ['appointments'],
    });
    if (!patient) {
      throw new NotFoundException('');
    }
    return patient.appointments;
  }
}
