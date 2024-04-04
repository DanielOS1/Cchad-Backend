import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Secretary } from './secretary.entity';
import { SecretaryService } from './secretary.service';
import { SecretaryResolver } from './secretary.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Secretary])],
  providers: [SecretaryService, SecretaryResolver],
  exports: [TypeOrmModule, SecretaryService, SecretaryResolver],
})
export class SecretaryModule {}
