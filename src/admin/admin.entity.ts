import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { User } from 'src/interfaces/user.interface';

enum adminRol {
  ROL = 'Administrador',
}

@ObjectType('Admin')
@Entity('admin')
export class Admin implements User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'enum', enum: adminRol, default: adminRol.ROL })
  role: adminRol;

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
  @CreateDateColumn({ precision: 0 })
  createAt: Date;

  @Field()
  @UpdateDateColumn({ precision: 0 })
  updateAt: Date;
}
