import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { MailService } from './mail.service';

config();

const configService = new ConfigService();

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: configService.get('MAILDEV_INCOMING_USER'),
          pass: configService.get('MAILDEV_INCOMING_PASS'),
        },
      },
      defaults: {
        from: '"Centro Médico Cchad" <cchad.atencion@gmail.com>',
      },
    }),
  ],
  providers: [MailService],
})
export class MailModule {}
