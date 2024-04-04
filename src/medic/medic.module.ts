import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MedicService } from './medic.service';
import { MedicResolver } from './medic.resolver';
import { Medic } from './medic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medic])],
  providers: [MedicService, MedicResolver],
  exports: [TypeOrmModule, MedicService, MedicResolver],
})
export class MedicModule {}
