import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { Box } from '../box/box.entity';

@ObjectType('Branch')
@Entity('branch')
export class Branch {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Box], { nullable: 'items' })
  @OneToMany(() => Box, (box) => box.branch, {
    onUpdate: 'CASCADE',
  })
  boxes: Box[];

  @Field()
  @CreateDateColumn({ precision: 0 })
  createAt: Date;

  @Field()
  @UpdateDateColumn({ precision: 0 })
  updateAt: Date;
}
