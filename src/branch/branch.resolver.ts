import { Query, Resolver } from '@nestjs/graphql';

import { Branch } from './branch.entity';

@Resolver()
export class BranchResolver {
  constructor() {}

  @Query(() => Branch)
  async branches() {
    return 'Hola';
  }
}
