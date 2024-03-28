import { Query, Resolver } from '@nestjs/graphql';

import { Box } from './box.entity';

@Resolver()
export class BoxResolver {
  constructor() {}

  @Query(() => Box)
  async boxes() {
    return 'Hola';
  }
}
