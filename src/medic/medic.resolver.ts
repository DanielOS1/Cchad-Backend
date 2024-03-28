import { Query, Resolver } from '@nestjs/graphql';

import { Medic } from './medic.entity';

@Resolver()
export class MedicResolver {
  constructor() {}

  @Query(() => Medic)
  async medics() {
    return 'Hola';
  }
}
