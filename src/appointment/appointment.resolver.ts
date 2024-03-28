import { Query, Resolver } from '@nestjs/graphql';

import { Appointment } from './appointment.entity';

@Resolver()
export class AppointmentResolver {
  constructor() {}

  @Query(() => Appointment)
  async appointments() {
    return 'Hola';
  }
}
