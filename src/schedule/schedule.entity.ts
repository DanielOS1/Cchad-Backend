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
import { Medic } from '../medic/medic.entity';
import { Box } from '../box/box.entity';
import { Slot } from '../slot/slot.entity';

@ObjectType('Schedule')
@Entity('schedule')
export class Schedule {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'tstzrange',
  })
  time: string;

  @Column({
    type: 'tstzrange',
    nullable: true,
  })
  blockedTime: string;

  @Column({ type: 'interval' })
  slotDuration: string;

  @Field(() => Medic)
  @ManyToOne(() => Medic, (medic) => medic.schedules)
  medic: Medic;

  @Field(() => Box)
  @ManyToOne(() => Box, (box) => box.schedules)
  box: Box;

  @Field(() => [Slot], { nullable: 'items' })
  @OneToMany(() => Slot, (slot) => slot.schedule)
  slots: Slot[];

  @Field()
  @CreateDateColumn({ precision: 0 })
  createAt: Date;

  @Field()
  @UpdateDateColumn({ precision: 0 })
  updateAt: Date;
}
