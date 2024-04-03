import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './admin.dto';

@Resolver()
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Mutation(() => Admin)
  async registerAdmin(@Args('input') input: CreateAdminDto) {
    return this.adminService.create(input);
  }
}
