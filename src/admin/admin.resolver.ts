import { Query, Resolver } from '@nestjs/graphql';

import { Admin } from './admin.entity';

@Resolver()
export class AdminResolver {
  constructor() {}

  @Query(() => Admin)
  async admins() {
    return 'Hola';
  }
}
