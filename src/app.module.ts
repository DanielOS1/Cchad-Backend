import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as Joi from 'joi';

import config from './config';
import { join } from 'path';

import { Appointment } from './appointment/appointment.entity';
import { AppointmentResolver } from './appointment/appointment.resolver';
import { Box } from './box/box.entity';
import { BoxResolver } from './box/box.resolver';
import { Branch } from './branch/branch.entity';
import { BranchResolver } from './branch/branch.resolver';
import { Schedule } from './schedule/schedule.entity';
import { ScheduleResolver } from './schedule/schedule.resolver';
import { AuthModule } from './auth/auth.module';
import { AppointmentService } from './appointment/appointment.service';
import { BoxService } from './box/box.service';
import { BranchService } from './branch/branch.service';
import { ScheduleService } from './schedule/schedule.service';
import { Slot } from './slot/slot.entity';
import { SlotResolver } from './slot/slot.resolver';
import { SlotService } from './slot/slot.service';
import { PatientResolver } from './patient/patient.resolver';
import { SecretaryResolver } from './secretary/secretary.resolver';
import { AdminResolver } from './admin/admin.resolver';
import { MedicResolver } from './medic/medic.resolver';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { AuthResolver } from './auth/auth.resolver';

import { dataSourceOptions } from './database/dataSource';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        DB_NAME: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([Appointment, Box, Branch, Schedule, Slot]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: process.env.NODE_ENV === 'production' ? true : join(process.cwd(), 'src/schema.gql'),
      playground: process.env.NODE_ENV !== 'production', // Playground habilitado solo en desarrollo
      csrfPrevention: process.env.CSRF_PREVENTION === 'true',
    }),
    AuthModule,
    MailModule,
  ],
  providers: [
    AppointmentResolver,
    AppointmentService,
    BoxResolver,
    BoxService,
    BranchResolver,
    BranchService,
    ScheduleResolver,
    ScheduleService,
    SlotResolver,
    SlotService,
    PatientResolver,
    MedicResolver,
    SecretaryResolver,
    AdminResolver,
    MailService,
    AuthResolver,
  ],
})
export class AppModule {}
