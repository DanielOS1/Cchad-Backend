import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Branch } from './branch.entity';
import { Box } from 'src/box/box.entity';
import { BranchService } from './branch.service';

@Resolver(() => Branch)
export class BranchResolver {
  constructor(private readonly branchService: BranchService) {}

  @ResolveField('boxes', () => [Box])
  async boxes(@Parent() branch: Branch) {
    const { id } = branch;
    return this.branchService.getBoxes(id);
  }
}
