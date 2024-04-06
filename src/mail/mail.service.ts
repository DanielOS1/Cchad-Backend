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
      text: `Usuario: ${name} ${lastName}, Rol:${role}, Correo de ingreso: ${email}, Clave provisional: ${password}`,
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
        text: `Te damos la bienvenida ${name} ${lastName}. Credenciales de ingreso: - Correo electrónico: ${email}, Clave provisional: ${password}. **IMPORTANTE - Por favor, recuerda que la clave provisional debe cambiarse lo antes posible por motivos de seguridad.**`,
      });
    } else {
      this.mailerService.sendMail({
        to: email,
        subject: 'Bienvenido a Centro Médico Cchad',
        text: `Te damos la bienvenida ${name} ${lastName}, Correo de ingreso: ${email}`,
      });
    }
  }
}
