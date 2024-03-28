import { Query, Resolver } from '@nestjs/graphql';

import { Patient } from './patient.entity';

@Resolver()
export class PatientResolver {
  constructor() {}

  @Query(() => Patient)
  async patients() {
    return 'Hola';
  }
}
