import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

import { Patient } from '../patient/patient.entity';
import { Slot } from '../slot/slot.entity';

export enum appointmentState {
  Reservada = 'Reservada',
  Reprogramada = 'Reprogramada',
  Cancelada = 'Cancelada',
  Completada = 'Completada',
}

registerEnumType(appointmentState, {
  name: 'AppointmentState',
});

export enum appointmentType {
  Consulta = 'Consulta',
  Control = 'Control',
  Procedimiento = 'Procedimiento',
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
  @Column({
    type: 'enum',
    enum: appointmentState,
    default: appointmentState.Reservada,
  })
  state: appointmentState;

  @Field()
  @Column({ default: false })
  confirmed: boolean;

  @Field(() => appointmentType)
  @Column({ type: 'enum', enum: appointmentType })
  type: appointmentType;

  @Field()
  @Column({ nullable: true })
  diagnosis: string;

  @Field()
  @Column({ nullable: true })
  treatment: string;

  @Field()
  @Column({ name: 'prescription_drugs', nullable: true })
  prescriptionDrugs: string;

  @Field(() => Patient, { nullable: true })
  @ManyToOne(() => Patient, (patient) => patient.appointments, {
    nullable: false,
  })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Field(() => Slot)
  @ManyToOne(() => Slot, (slot) => slot.appointments, { nullable: false })
  @JoinColumn({ name: 'slot_id' })
  slot: Slot;

  @Field()
  @CreateDateColumn({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp with time zone',
  })
  createAt: Date;

  @Field()
  @UpdateDateColumn({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp with time zone',
  })
  updateAt: Date;
}
