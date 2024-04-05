import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Box } from './box.entity';
import { BoxService } from './box.service';
import { Schedule } from 'src/schedule/schedule.entity';
import { Branch } from 'src/branch/branch.entity';

@Resolver(() => Box)
export class BoxResolver {
  constructor(private readonly boxService: BoxService) {}

  @ResolveField('schedules', () => [Schedule])
  async schedules(@Parent() box: Box) {
    const { id } = box;
    return this.boxService.getSchedules(id);
  }

  @ResolveField('branch', () => Branch)
  async branch(@Parent() box: Box) {
    const { id } = box;
    return this.boxService.getBranch(id);
  }
}
