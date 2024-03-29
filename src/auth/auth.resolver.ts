import {
  Args,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './authGuard';
import { AuthService } from './auth.service';

import { Patient } from 'src/patient/patient.entity';
import { PatientService } from 'src/patient/patient.service';
import { userAuthenticationDto } from './auth.dto';
import { UnauthorizedException } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { Role } from './role.enum';
import { RolesGuard } from './roles.guard';

@ObjectType()
class AuthResult {
  @Field()
  user: Patient;

  @Field()
  token: string;
}

@Resolver()
export class AuthResolver {
  constructor(
    private readonly patientService: PatientService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => String)
  @Roles(Role.Patient)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async testQuery() {
    return 'success';
  }

  @Mutation(() => AuthResult)
  async authenticateUser(@Args('input') input: userAuthenticationDto) {
    let user: Patient;
    if (input.role == Role.Patient) {
      user = await this.patientService.getPatientByEmail(input.email);
    }
    const passwordHasMatch = await this.authService.validatePassword(
      input.password,
      user.password,
    );
    if (passwordHasMatch) {
      return this.authService.generateJWT(user);
    }
    throw new UnauthorizedException();
  }
}
