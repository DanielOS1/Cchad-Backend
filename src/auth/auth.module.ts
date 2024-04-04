import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import { AuthService } from './auth.service';
import config from 'src/config';
import { JwtStrategy } from './passportStrategy';
import { AuthResolver } from './auth.resolver';
import { PatientModule } from 'src/patient/patient.module';
import { MedicModule } from 'src/medic/medic.module';
import { SecretaryModule } from 'src/secretary/secretary.module';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.JwtSecret,
        };
      },
    }),
    PatientModule,
    MedicModule,
    SecretaryModule,
    AdminModule,
  ],
  providers: [JwtStrategy, AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
