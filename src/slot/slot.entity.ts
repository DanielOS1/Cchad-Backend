import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
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

  @Field()
  @Column({
    type: 'tstzrange',
  })
  time: string;

  @Field()
  @Column({ default: false })
  blocked: boolean;

  @Field()
  @Column({ default: true })
  enabled: boolean;

  @Field(() => Schedule)
  @ManyToOne(() => Schedule, (schedule) => schedule.slots, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'schedule_id' })
  schedule: Schedule;

  @Field(() => [Appointment], { nullable: 'items' })
  @OneToMany(() => Appointment, (appointment) => appointment.slot)
  appointments: Appointment[];

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
