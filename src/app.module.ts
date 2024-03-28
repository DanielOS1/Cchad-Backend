import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as Joi from 'joi';

import config from './config';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Patient } from './patient/patient.entity';
import { PatientResolver } from './patient/patient.resolver';
import { Secretary } from './secretary/secretary.entity';
import { SecretaryResolver } from './secretary/secretary.resolver';
import { Medic } from './medic/medic.entity';
import { MedicResolver } from './medic/medic.resolver';
import { Admin } from './admin/admin.entity';
import { AdminResolver } from './admin/admin.resolver';
import { Appointment } from './appointment/appointment.entity';
import { AppointmentResolver } from './appointment/appointment.resolver';
import { Box } from './box/box.entity';
import { BoxResolver } from './box/box.resolver';
import { Branch } from './branch/branch.entity';
import { BranchResolver } from './branch/branch.resolver';
import { Shift } from './shift/shift.entity';
import { ShiftResolver } from './shift/shift.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_HOST: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
    TypeOrmModule.forFeature([
      Patient,
      Medic,
      Secretary,
      Admin,
      Appointment,
      Box,
      Branch,
      Shift,
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PatientResolver,
    MedicResolver,
    SecretaryResolver,
    AdminResolver,
    AppointmentResolver,
    BoxResolver,
    BranchResolver,
    ShiftResolver,
  ],
})
export class AppModule {}
