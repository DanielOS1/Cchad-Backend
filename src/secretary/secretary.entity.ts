import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';

import { User } from 'src/interfaces/user.interface';

@ObjectType('Secretary')
@Entity('secretary')
export class Secretary implements User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ default: true })
  enabled: boolean;

  @Field()
  @CreateDateColumn({ precision: 0 })
  createAt: Date;

  @Field()
  @UpdateDateColumn({ precision: 0 })
  updateAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
}
