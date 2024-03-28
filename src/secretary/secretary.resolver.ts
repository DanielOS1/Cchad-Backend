import { Query, Resolver } from '@nestjs/graphql';

import { Secretary } from './secretary.entity';

@Resolver()
export class SecretaryResolver {
  constructor() {}

  @Query(() => Secretary)
  async secretaries() {
    return 'Hola';
  }
}
