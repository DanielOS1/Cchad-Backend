import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { config } from 'dotenv';
import { join } from "path";

import { MailService } from './mail.service';

config();

const configService = new ConfigService();

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: configService.get('EMAIL_HOST'),
        port: configService.get('EMAIL_PORT'),
        secure: configService.get('SMTP_SECURE'),
        auth: {
          user: configService.get('EMAIL_USER'),
          pass: configService.get('EMAIL_PASSWORD'),
        },
      },
      defaults: {
        from: configService.get('EMAIL_FROM'),
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
})
export class MailModule {}
