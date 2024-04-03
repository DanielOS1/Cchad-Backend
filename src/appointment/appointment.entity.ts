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
import { Shift } from '../shift/shift.entity';

enum appointmentState {
  ACEPTED = 'Aceptado',
  REJECTED = 'Rechazado',
  RESCHEDULED = 'Reprogramado',
  CANCELED = 'Cancelado',
}

registerEnumType(appointmentState, {
  name: 'AppointmentState',
});

enum appointmentType {
  CONSULT = 'consulta',
  CONTROL = 'control',
  PROCEDURE = 'procedimiento',
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

  @Field()
  @Column({ precision: 0 })
  startTime: Date;

  @Field()
  @Column({ precision: 0 })
  endTime: Date;

  @Field(() => appointmentState)
  @Column({ type: 'enum', enum: appointmentState })
  state: appointmentState;

  @Field()
  @Column({ default: false })
  confirmed: boolean;

  @Field()
  @Column({ default: false })
  completed: boolean;

  @Field(() => appointmentType)
  @Column({ type: 'enum', enum: appointmentType })
  type: appointmentType;

  @Field(() => Patient, { nullable: true })
  @ManyToOne(() => Patient, (patient) => patient.appointments, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  patient: Patient;

  @Field(() => Shift, { nullable: true })
  @ManyToOne(() => Shift, (shift) => shift.appointments, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  shift: Shift;

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
