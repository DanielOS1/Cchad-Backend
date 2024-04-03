import { ConflictException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { describe } from 'node:test';

import { Patient } from '../../src/patient/patient.entity';
import { PatientService } from '../../src/patient/patient.service';
import { CreatePatientDto } from '../../src/patient/patient.dto';
import { patientForecast } from '../../src/patient/patient.entity';
import { patientGender } from '../../src/patient/patient.entity';

const mockPatient = new Patient();
mockPatient.id = 1;
mockPatient.name = 'John';
mockPatient.lastName = 'Doe';
mockPatient.email = 'john@example.com';
mockPatient.password = 'password';
mockPatient.gender = patientGender.MALE;
mockPatient.birthdate = new Date('1990-01-01');
mockPatient.phone = '123456789';
mockPatient.address = '123 Street';
mockPatient.forecast = patientForecast.ISAPRE;
mockPatient.enabled = true;
mockPatient.appointments = [];
mockPatient.createAt = new Date('1990-01-01');
mockPatient.updateAt = new Date('1990-01-01');

const createPatientDto: CreatePatientDto = {
  name: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'password',
  gender: patientGender.MALE,
  birthdate: new Date('1990-01-01'),
  phone: '123456789',
  address: '123 Street',
  forecast: patientForecast.ISAPRE,
};

const mockRepository = {
  findOneBy: jest.fn().mockReturnValue(mockPatient),
  create: jest.fn().mockReturnValue(mockPatient),
  save: jest.fn().mockResolvedValue(mockPatient),
};

describe('PatientService', () => {
  let service: PatientService;
  let repository: Repository<Patient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: getRepositoryToken(Patient),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PatientService>(PatientService);
    repository = module.get<Repository<Patient>>(getRepositoryToken(Patient));
  });

  describe('getPatientByEmail', () => {
    it('should return patient by email', async () => {
      const email = 'test@example.com';
      const result = await service.getPatientByEmail(email);
      expect(result).toEqual(mockPatient);
    });

    it('should throw NotFoundException if patient is not found', async () => {
      const email = 'nonexistent@example.com';
      mockRepository.findOneBy.mockReturnValueOnce(undefined);
      await expect(service.getPatientByEmail(email)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new patient', async () => {
      const result = await service.create(createPatientDto);
      expect(result).toEqual(mockPatient);
      expect(repository.create).toHaveBeenCalledWith(createPatientDto);
      expect(repository.save).toHaveBeenCalledWith(mockPatient);
    });

    it('should throw ConflictException if patient with the same email already exists', async () => {
      const uniqueKeyViolationError = new Error();
      mockRepository.save.mockRejectedValue(uniqueKeyViolationError);
      try {
        await service.create(createPatientDto);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });
  });
});
