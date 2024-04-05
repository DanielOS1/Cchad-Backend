import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

import { Patient } from '../patient/patient.entity';
import { Slot } from '../slot/slot.entity';

enum appointmentState {
  RESERVED = 'Reservada',
  RESCHEDULED = 'Reprogramada',
  CANCELED = 'Cancelada',
  COMPLETED = 'Completada',
}

registerEnumType(appointmentState, {
  name: 'AppointmentState',
});

enum appointmentType {
  CONSULT = 'Consulta',
  CONTROL = 'Control',
  PROCEDURE = 'Procedimiento',
}

registerEnumType(appointmentType, {
  name: 'AppointmentType',
});

@ObjectType('Appointment')
@Entity('appointment')
export class Appointment {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => appointmentState)
  @Column({ type: 'enum', enum: appointmentState })
  state: appointmentState;

  @Field()
  @Column({ default: false })
  confirmed: boolean;

  @Field(() => appointmentType)
  @Column({ type: 'enum', enum: appointmentType })
  type: appointmentType;

  @Field()
  @Column()
  diagnosis: string;

  @Field()
  @Column()
  treatment: string;

  @Field()
  @Column()
  prescriptionDrugs: string;

  @Field(() => Patient, { nullable: true })
  @ManyToOne(() => Patient, (patient) => patient.appointments)
  patient: Patient;

  @Field(() => Slot)
  @ManyToOne(() => Slot, (slot) => slot.appointments)
  slot: Slot;

  @Field()
  @CreateDateColumn({
    precision: 0,
  })
  createAt: Date;

  @Field()
  @UpdateDateColumn({
    precision: 0,
  })
  updateAt: Date;
}
