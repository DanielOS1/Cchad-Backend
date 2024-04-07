import {
  Args,
  Field,
  Mutation,
  ObjectType,
  Resolver,
  Query,
} from '@nestjs/graphql';
import {
  HttpException,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Patient } from 'src/patient/patient.entity';
import { Medic } from 'src/medic/medic.entity';
import { Admin } from 'src/admin/admin.entity';
import { Secretary } from 'src/secretary/secretary.entity';
import { PatientService } from 'src/patient/patient.service';
import { MedicService } from 'src/medic/medic.service';
import { SecretaryService } from 'src/secretary/secretary.service';
import { AdminService } from 'src/admin/admin.service';
import {
  changePasswordDto,
  recoverPasswordDto,
  userAuthenticationDto,
} from './auth.dto';
import { Role } from './role.enum';
import { JwtAuthGuard } from './authGuard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { MailOptions } from 'nodemailer/lib/smtp-transport';
import { MailService } from 'src/mail/mail.service';

@ObjectType()
export class User {
  @Field({ nullable: true })
  patient: Patient;

  @Field({ nullable: true })
  medic: Medic;

  @Field({ nullable: true })
  secretary: Secretary;

  @Field({ nullable: true })
  admin: Admin;
}

@ObjectType()
export class AuthResult {
  @Field()
  user: User;

  @Field()
  token: string;
}

@Resolver()
export class AuthResolver {
  constructor(
    private readonly patientService: PatientService,
    private readonly medicService: MedicService,
    private readonly authService: AuthService,
    private readonly secretaryService: SecretaryService,
    private readonly adminService: AdminService,
    private readonly mailService: MailService,
  ) {}

  @Query(() => String) //ELMINAR DESPUES
  @Roles(Role.Medic, Role.Patient, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async testQuery() {
    return 'success';
  }

  @Mutation(() => AuthResult, { nullable: true })
  async authenticateUser(@Args('input') input: userAuthenticationDto) {
    const user: User = new User();
    let userPassword: string;
    switch (input.role) {
      case Role.Patient:
        user.patient = await this.patientService.getPatientByEmail(input.email);
        userPassword = user.patient.password;
        break;
      case Role.Medic:
        user.medic = await this.medicService.getMedicByEmail(input.email);
        userPassword = user.medic.password;
        break;
      case Role.Secretary:
        user.secretary = await this.secretaryService.getSecretaryByEmail(
          input.email,
        );
        userPassword = user.secretary.password;
        break;
      case Role.Admin:
        user.admin = await this.adminService.getAdminByEmail(input.email);
        userPassword = user.admin.password;
        break;
    }
    const passwordHasMatch = await this.authService.validatePassword(
      input.password,
      userPassword,
    );
    if (passwordHasMatch) {
      return this.authService.generateJWT(user, input.role);
    }
    throw new UnauthorizedException();
  }

  @Mutation(() => User, { nullable: true })
  /*@UseGuards(JwtAuthGuard)*/
  async changePassword(@Args('input') input: changePasswordDto) {
    const user: User = new User();
    switch (input.role) {
      case Role.Patient:
        user.patient = await this.patientService.update(input.userid, {
          password: input.newPassword,
        });
        break;
      case Role.Medic:
        user.medic = await this.medicService.update(input.userid, {
          password: input.newPassword,
        });
        break;
      case Role.Secretary:
        user.secretary = await this.secretaryService.update(input.userid, {
          password: input.newPassword,
        });
        break;
      case Role.Admin:
        user.admin = await this.adminService.update(input.userid, {
          password: input.newPassword,
        });
        break;
    }
    return user;
  }

  @Mutation(() => String, { nullable: true })
  async recoverPassword(@Args('input') input: recoverPasswordDto) {
    const randomPassword: string = Math.random().toString(36).slice(2, 10);
    const user: User = new User();
    switch (input.role) {
      case Role.Patient:
        user.patient = await this.patientService.getPatientByEmail(input.email);
        if (user.patient) {
          const patient: Patient = await this.patientService
            .update(user.patient.id, {
              password: randomPassword,
            })
            .catch((error) => {
              throw new HttpException('message', error.detail);
            });
          this.mailService.recoverPassword(patient.email, randomPassword);
          return patient.email;
        }
        break;
      case Role.Medic:
        user.medic = await this.medicService.getMedicByEmail(input.email);
        if (user.medic) {
          const medic: Medic = await this.medicService
            .update(user.medic.id, {
              password: randomPassword,
            })
            .catch((error) => {
              throw new HttpException('message', error.detail);
            });
          this.mailService.recoverPassword(medic.email, randomPassword);
          return medic.email;
        }
        break;
      case Role.Secretary:
        user.secretary = await this.secretaryService.getSecretaryByEmail(
          input.email,
        );
        if (user.secretary) {
          const secretary: Secretary = await this.secretaryService
            .update(user.secretary.id, {
              password: randomPassword,
            })
            .catch((error) => {
              throw new HttpException('message', error.detail);
            });
          this.mailService.recoverPassword(secretary.email, randomPassword);
          return secretary.email;
        }
        break;
      case Role.Admin:
        user.admin = await this.adminService.getAdminByEmail(input.email);
        if (user.admin) {
          const admin: Admin = await this.adminService
            .update(user.admin.id, {
              password: randomPassword,
            })
            .catch((error) => {
              throw new HttpException('message', error.detail);
            });
          this.mailService.recoverPassword(admin.email, randomPassword);
          return admin.email;
        }
        break;
    }
    throw new NotFoundException('');
  }
}
