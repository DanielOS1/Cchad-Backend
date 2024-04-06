import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { registerAdminDto } from './admin.dto';
import { SecretaryService } from 'src/secretary/secretary.service';
import { registerSecretaryDto } from 'src/secretary/secretary.dto';
import { MedicService } from 'src/medic/medic.service';
import { registerMedicDto } from 'src/medic/medic.dto';
import { Secretary } from 'src/secretary/secretary.entity';
import { Medic } from 'src/medic/medic.entity';
import { CreatePatientBySecretaryOrAdminDto } from 'src/patient/patient.dto';
import { PatientService } from 'src/patient/patient.service';
import { Patient } from 'src/patient/patient.entity';
import { MailService } from 'src/mail/mail.service';
import { Role } from 'src/auth/role.enum';

@Resolver()
export class AdminResolver {
  constructor(
    private readonly adminService: AdminService,
    private readonly secretaryService: SecretaryService,
    private readonly medicService: MedicService,
    private readonly patientService: PatientService,
    private readonly mailService: MailService,
  ) {}

  generateProvisionalPassword() {
    return Math.random().toString(36).slice(2, 10);
  }

  @Mutation(() => Admin)
  /*@Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)*/
  async registerAdmin(@Args('input') input: registerAdminDto) {
    const randomPassword: string = this.generateProvisionalPassword();
    const newAdmin: Admin = await this.adminService.create({
      ...input,
      password: randomPassword,
    });
    if (newAdmin) {
      this.mailService.registeredStaff(
        newAdmin.name,
        newAdmin.lastName,
        Role.Admin,
        newAdmin.email,
        randomPassword,
      );
    }
    return newAdmin;
  }

  @Mutation(() => Secretary)
  /*@Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)*/
  async registerSecretary(@Args('input') input: registerSecretaryDto) {
    const randomPassword: string = this.generateProvisionalPassword();
    const newSecretary: Secretary = await this.secretaryService.create({
      ...input,
      password: randomPassword,
    });
    if (newSecretary) {
      this.mailService.registeredStaff(
        newSecretary.name,
        newSecretary.lastName,
        Role.Secretary,
        newSecretary.email,
        randomPassword,
      );
    }
    return newSecretary;
  }

  @Mutation(() => Medic)
  /*@Roles(Role.Secretary, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)*/
  async registerMedic(@Args('input') input: registerMedicDto) {
    const randomPassword: string = this.generateProvisionalPassword();
    const newMedic: Medic = await this.medicService.create({
      ...input,
      password: randomPassword,
    });
    if (newMedic) {
      this.mailService.registeredStaff(
        newMedic.name,
        newMedic.lastName,
        'Personal Médico',
        newMedic.email,
        randomPassword,
      );
    }
    return newMedic;
  }

  @Mutation(() => Patient)
  /*@Roles(Role.Secretary, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)*/
  async registerPatientBySecretaryOrAdmin(
    @Args('input') input: CreatePatientBySecretaryOrAdminDto,
  ) {
    const randomPassword: string = Math.random().toString(36).slice(2, 10);
    const newPatient: Patient = await this.patientService.create({
      ...input,
      password: randomPassword,
    });
    if (newPatient) {
      this.mailService.registeredPatient(
        newPatient.name,
        newPatient.lastName,
        newPatient.email,
        randomPassword,
      );
    }
    return newPatient;
  }
}
