import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
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

  @Field()
  @Column({
    type: 'tstzrange',
  })
  time: string;

  @Field()
  @Column({ type: 'interval', name: 'slot_duration' })
  slotDuration: string;

  @Field()
  @Column({ default: false })
  public: boolean;

  @Field(() => Medic)
  @ManyToOne(() => Medic, (medic) => medic.schedules, { nullable: false })
  @JoinColumn({ name: 'medic_id' })
  medic: Medic;

  @Field(() => Box)
  @ManyToOne(() => Box, (box) => box.schedules, { nullable: false })
  @JoinColumn({ name: 'box_id' })
  box: Box;

  @Field(() => [Slot], { nullable: 'items' })
  @OneToMany(() => Slot, (slot) => slot.schedule)
  slots: Slot[];

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

  @BeforeInsert()
  transformTimeToRange() {
    // Transformar el string a un formato compatible con tstzrange
    const [start, end] = this.time
      .split(';')
      .map((date) => new Date(date).toISOString());
    this.time = `[${start},${end})`; // En PostgreSQL, los intervalos cerrados se representan con "[" y ")", lo que significa que el límite inferior está incluido y el límite superior está excluido.
  }
}
