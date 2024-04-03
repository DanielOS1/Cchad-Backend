import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Secretary } from './secretary.entity';
import { CreateSecretaryDto } from 'src/secretary/secretary.dto';
import { SecretaryService } from './secretary.service';

@Resolver()
export class SecretaryResolver {
  constructor(private readonly secretaryService: SecretaryService) {}

  @Mutation(() => Secretary)
  async registerSecretary(@Args('input') input: CreateSecretaryDto) {
    return this.secretaryService.create(input);
  }
}
