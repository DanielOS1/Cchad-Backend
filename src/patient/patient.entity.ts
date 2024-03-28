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
import { Appointment } from '../appointment/appointment.entity';

enum patientForecast {
  FONASA = 'FONASA',
  ISAPRE = 'ISAPRE',
  PARTICULAR = 'Particular',
}

enum patientGender {
  MALE = 'masculino',
  FEMALE = 'femenino',
}

@ObjectType('Patient')
@Entity('patient')
export class Patient implements User {
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
  @Column({ type: 'enum', enum: patientGender })
  gender: patientGender;

  @Field()
  @Column({ precision: 0 })
  birthdate: Date;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  adress: string;

  @Field()
  @Column({ type: 'enum', enum: patientForecast })
  forecast: patientForecast;

  @Field()
  @Column({ default: true })
  enabled: boolean;

  @OneToMany(() => Appointment, (appointment) => appointment.patient, {
    onUpdate: 'CASCADE',
  })
  appointments: Appointment[];

  @Field()
  @CreateDateColumn({ precision: 0 })
  createAt: Date;

  @Field()
  @UpdateDateColumn({ precision: 0 })
  updateAt: Date;
}
