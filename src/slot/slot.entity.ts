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
import { Schedule } from '../schedule/schedule.entity';

@ObjectType('Slot')
@Entity('slot')
export class Slot {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'tstzrange',
  })
  time: string;

  @Field()
  @Column({ default: true })
  enabled: boolean;

  @Field(() => Schedule)
  @ManyToOne(() => Schedule, (schedule) => schedule.slots)
  schedule: Schedule;

  @Field(() => [Appointment], { nullable: 'items' })
  @OneToMany(() => Appointment, (appointment) => appointment.slot)
  appointments: Appointment[];

  @Field()
  @CreateDateColumn({ precision: 0 })
  createAt: Date;

  @Field()
  @UpdateDateColumn({ precision: 0 })
  updateAt: Date;
}
