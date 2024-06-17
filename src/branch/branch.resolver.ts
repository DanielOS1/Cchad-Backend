import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Branch } from './branch.entity';
import { Box } from 'src/box/box.entity';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './branch.dto';

@Resolver(() => Branch)
export class BranchResolver {
  constructor(private readonly branchService: BranchService) {}

  @ResolveField('boxes', () => [Box])
  async boxes(@Parent() branch: Branch) {
    const { id } = branch;
    return this.branchService.getBoxes(id);
  }

  @Query(() => [Branch])
  async branches(): Promise<Branch[]> {
    return this.branchService.getAll();
  }

  @Query(() => Branch)
  async branch(@Args('id', { type: () => Int }) id: number): Promise<Branch> {
    return this.branchService.getBranchById(id);
  }

  @Mutation(() => Branch)
  /*@Roles(Role.Admin, Role.Secretary)
  @UseGuards(JwtAuthGuard, RolesGuard)*/
  async createBranch(@Args('input') input: CreateBranchDto): Promise<Branch> {
    return await this.branchService.create(input);
  }

  @Mutation(() => Boolean)
  /*@Roles(Role.Admin, Role.Secretary)
  @UseGuards(JwtAuthGuard, RolesGuard)*/
  async deleteBranch(@Args('id') id: number): Promise<boolean> {
    return await this.branchService.delete(id);
  }

  @Mutation(() => Branch)
  /*@Roles(Role.Admin, Role.Secretary)
  @UseGuards(JwtAuthGuard, RolesGuard)*/
  async disableBranch(@Args('id') id: number): Promise<Branch> {
    return await this.branchService.disable(id);
  }

  @Mutation(() => Branch)
  /*@Roles(Role.Admin, Role.Secretary)
  @UseGuards(JwtAuthGuard, RolesGuard)*/
  async enableBranch(@Args('id') id: number): Promise<Branch> {
    return await this.branchService.enable(id);
  }
}
