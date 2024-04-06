import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Secretary } from './secretary.entity';
import { SecretaryService } from './secretary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Secretary])],
  providers: [SecretaryService],
  exports: [TypeOrmModule, SecretaryService],
})
export class SecretaryModule {}
