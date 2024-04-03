import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Box } from './box.entity';
import { BoxService } from './box.service';
import { Shift } from 'src/shift/shift.entity';
import { Branch } from 'src/branch/branch.entity';

@Resolver(() => Box)
export class BoxResolver {
  constructor(private readonly boxService: BoxService) {}

  @ResolveField('shifts', () => [Shift])
  async shifts(@Parent() box: Box) {
    const { id } = box;
    return this.boxService.getShifts(id);
  }

  @ResolveField('branch', () => Branch)
  async branch(@Parent() box: Box) {
    const { id } = box;
    return this.boxService.getBranch(id);
  }
}
