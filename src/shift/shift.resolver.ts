import { Query, Resolver } from '@nestjs/graphql';

import { Shift } from './shift.entity';

@Resolver()
export class ShiftResolver {
  constructor() {}

  @Query(() => Shift)
  async shifts() {
    return '';
  }
}
