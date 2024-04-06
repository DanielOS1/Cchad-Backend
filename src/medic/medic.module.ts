import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MedicService } from './medic.service';
import { Medic } from './medic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medic])],
  providers: [MedicService],
  exports: [TypeOrmModule, MedicService],
})
export class MedicModule {}
