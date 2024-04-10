import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Box } from './box.entity';
import { BoxService } from './box.service';
import { Schedule } from 'src/schedule/schedule.entity';
import { Branch } from 'src/branch/branch.entity';

@Resolver(() => Box)
export class BoxResolver {
  constructor(private readonly boxService: BoxService) {}

  @ResolveField('schedules', () => [Schedule])
  async schedules(@Parent() box: Box): Promise<Schedule[]> {
    const { id } = box;
    return this.boxService.getSchedules(id);
  }

  @ResolveField('branch', () => Branch)
  async branch(@Parent() box: Box): Promise<Branch> {
    const { id } = box;
    return this.boxService.getBranch(id);
  }

  @Query(() => [Box])
  async boxes(): Promise<Box[]> {
    return this.boxService.getAll();
  }

  @Query(() => Box)
  async box(@Args('id', { type: () => Int }) id: number): Promise<Box> {
    return this.boxService.getBoxById(id);
  }
}
