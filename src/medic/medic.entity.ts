import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { User } from 'src/interfaces/user.interface';
import { Shift } from '../shift/shift.entity';

enum medicSpecialty {
  CARDIOLOGY = 'Cardiología',
  DERMATOLOGY = 'Dermatología',
  GASTROENTEROLOGY = 'Gastroenterology',
  NEUROLOGY = 'Neurología',
  GYNECOLOGY = 'Ginecología',
  OBSTETRICS = 'Obstetricia',
  OPHTHALMOLOGY = 'Oftalmología',
  PSYCHIATRY = 'Psiquiatría',
  INTERNALMEDICINE = 'Medicina Interna',
}

@ObjectType('Medic')
@Entity('medic')
export class Medic implements User {
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
  @Column({ type: 'enum', enum: medicSpecialty })
  specialty: medicSpecialty;

  @Field()
  @Column({ default: true })
  enabled: boolean;

  @OneToMany(() => Shift, (shift) => shift.medic, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  shifts: Shift[];

  @Field()
  @CreateDateColumn({ precision: 0 })
  createAt: Date;

  @Field()
  @UpdateDateColumn({ precision: 0 })
  updateAt: Date;
}
