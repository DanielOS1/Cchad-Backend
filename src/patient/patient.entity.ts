import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';

import { User } from 'src/interfaces/user.interface';
import { Appointment } from '../appointment/appointment.entity';

export enum patientForecast {
  FONASA = 'FONASA',
  ISAPRE = 'ISAPRE',
  PARTICULAR = 'Particular',
}

registerEnumType(patientForecast, {
  name: 'PatientForecast',
});

export enum patientGender {
  MALE = 'masculino',
  FEMALE = 'femenino',
}

registerEnumType(patientGender, {
  name: 'PatientGender',
});

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

  @Field(() => patientGender)
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
  address: string;

  @Field(() => patientForecast)
  @Column({ type: 'enum', enum: patientForecast })
  forecast: patientForecast;

  @Field()
  @Column({ default: true })
  enabled: boolean;

  @Field(() => [Appointment], { nullable: 'items' })
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

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
}
