import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { Patient } from '../patient/patient.entity';
import { Shift } from '../shift/shift.entity';

enum appointmentState {
  ACEPTED = 'Aceptado',
  REJECTED = 'Rechazado',
  RESCHEDULED = 'Reprogramado',
  CANCELED = 'Cancelado',
}

enum appointmentType {
  CONSULT = 'consulta',
  CONTROL = 'control',
  PROCEDURE = 'procedimiento',
}

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

  @Field()
  @Column({ type: 'enum', enum: appointmentState })
  state: appointmentState;

  @Field()
  @Column({ default: false })
  confirmed: boolean;

  @Field()
  @Column({ default: false })
  completed: boolean;

  @Field()
  @Column({ type: 'enum', enum: appointmentType })
  type: appointmentType;

  @ManyToOne(() => Patient, (patient) => patient.appointments, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  patient: Patient;

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
