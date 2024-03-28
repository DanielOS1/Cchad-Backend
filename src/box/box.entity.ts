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
import { Shift } from '../shift/shift.entity';
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

  @OneToMany(() => Shift, (shift) => shift.box, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  shifts: Shift[];

  @ManyToOne(() => Branch, (branch) => branch.boxes, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  branch: Branch;

  @Field()
  @CreateDateColumn({ precision: 0 })
  createAt: Date;

  @Field()
  @UpdateDateColumn({ precision: 0 })
  updateAt: Date;
}
