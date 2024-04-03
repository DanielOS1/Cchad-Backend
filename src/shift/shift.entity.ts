import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Appointment } from '../appointment/appointment.entity';
import { Medic } from '../medic/medic.entity';
import { Box } from '../box/box.entity';

@ObjectType('Shift')
@Entity('shift')
export class Shift {
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
  @Column({ default: false })
  blocked: boolean;

  @Field(() => Medic, { nullable: true })
  @ManyToOne(() => Medic, (medic) => medic.shifts, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  medic: Medic;

  @Field(() => Box, { nullable: true })
  @ManyToOne(() => Box, (box) => box.shifts, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  box: Box;

  @Field(() => [Appointment], { nullable: 'items' })
  @OneToMany(() => Appointment, (appointment) => appointment.shift, {
    onUpdate: 'CASCADE',
  })
  appointments: Appointment[];

  @Field()
  @CreateDateColumn({ precision: 0 })
  createAt: Date;

  @Field()
  @UpdateDateColumn({ precision: 0 })
  updateAt: Date;
}
