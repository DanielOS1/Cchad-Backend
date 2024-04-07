import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  sendMail(): void {
    this.mailerService.sendMail({
      to: 'milodiaz1995@gmail.com',
      from: 'cchad.atencion@gmail.com',
      subject: 'Testing Nest MailerModule',
      text: 'welcome',
      html: '<b>Success<b>',
    });
  }

  registeredStaff(
    name: string,
    lastName: string,
    role: string,
    email: string,
    password: string,
  ): void {
    this.mailerService.sendMail({
      to: email,
      subject: 'Registrado en Centro Médico Cchad',
      template: 'registerStaff',
      context: {
        name,
        lastName,
        email,
        password,
        role,
      },
    });
  }

  registeredPatient(
    name: string,
    lastName: string,
    email: string,
    password?: string,
  ): void {
    if (password) {
      this.mailerService.sendMail({
        to: email,
        subject: 'Bienvenido a Centro Médico Cchad',
        template: 'registerPatientByAdminOrSecretary',
        context: {
          name,
          lastName,
          email,
          password,
        },
      });
    } else {
      this.mailerService.sendMail({
        to: email,
        subject: 'Bienvenido a Centro Médico Cchad',
        template: `registerPatient`,
        context: {
          name,
          lastName,
          email,
        },
      });
    }
  }

  recoverPassword(email: string, password: string): void {
    this.mailerService.sendMail({
      to: email,
      subject: 'Recuperación de contraseña',
      template: 'passwordRecovery',
      context: {
        password,
      },
    });
  }
}
