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
import { Schedule } from '../schedule/schedule.entity';
import { Branch } from '../branch/branch.entity';

@ObjectType('Box')
@Entity('box')
export class Box {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ default: true })
  enabled: boolean;

  @Field(() => [Schedule], { nullable: 'items' })
  @OneToMany(() => Schedule, (schedule) => schedule.box)
  schedules: Schedule[];

  @Field(() => Branch)
  @ManyToOne(() => Branch, (branch) => branch.boxes, { nullable: false })
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

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
