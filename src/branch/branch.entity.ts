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

  @Field()
  @Column()
  address: string;

  @Field()
  @Column({
    name: 'opening_time',
    type: 'time',
  })
  openingTime: string;

  @Field()
  @Column({
    name: 'closing_time',
    type: 'time',
  })
  closingTime: string;

  @Field()
  @Column({ default: true })
  enabled: boolean;

  @Field(() => [Box], { nullable: 'items' })
  @OneToMany(() => Box, (box) => box.branch, {
    onUpdate: 'CASCADE',
  })
  boxes: Box[];

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
