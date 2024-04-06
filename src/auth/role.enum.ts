import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  Patient = 'Paciente',
  Medic = 'Médico',
  Secretary = 'Secretaria',
  Admin = 'Administrador',
}

registerEnumType(Role, {
  name: 'Role',
});
