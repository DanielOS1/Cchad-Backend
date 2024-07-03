import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Box } from './box.entity';
import { BoxService } from './box.service';
import { Schedule } from 'src/schedule/schedule.entity';
import { Branch } from 'src/branch/branch.entity';
import { CreateBoxDto } from './box.dto';

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

  @Mutation(() => Box)
  /*@Roles(Role.Admin, Role.Secretary)
  @UseGuards(JwtAuthGuard, RolesGuard)*/
  async createBox(@Args('input') input: CreateBoxDto): Promise<Box> {
    return await this.boxService.create(input);
  }

  @Mutation(() => Boolean)
  /*@Roles(Role.Admin, Role.Secretary)
  @UseGuards(JwtAuthGuard, RolesGuard)*/
  async deleteBox(@Args('id') id: number): Promise<boolean> {
    return await this.boxService.delete(id);
  }

  @Mutation(() => Box)
  /*@Roles(Role.Admin, Role.Secretary)
  @UseGuards(JwtAuthGuard, RolesGuard)*/
  async disableBox(@Args('id') id: number): Promise<Box> {
    return await this.boxService.disable(id);
  }

  @Mutation(() => Box)
  /*@Roles(Role.Admin, Role.Secretary)
  @UseGuards(JwtAuthGuard, RolesGuard)*/
  async enableBox(@Args('id') id: number): Promise<Box> {
    return await this.boxService.enable(id);
  }
}
