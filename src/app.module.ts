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
        JWT_SECRET: Joi.string().required(),
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
    TypeOrmModule.forFeature([Appointment, Box, Branch, Schedule, Slot]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
  ],
})
export class AppModule {}
