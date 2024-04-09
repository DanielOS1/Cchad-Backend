import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';

import { User } from 'src/interfaces/user.interface';
import { Schedule } from '../schedule/schedule.entity';

export enum medicSpecialty {
  CARDIOLOGY = 'Cardiología',
  DERMATOLOGY = 'Dermatología',
  GASTROENTEROLOGY = 'Gastroenterología',
  NEUROLOGY = 'Neurología',
  GYNECOLOGY = 'Ginecología',
  OBSTETRICS = 'Obstetricia',
  OPHTHALMOLOGY = 'Oftalmología',
  PSYCHIATRY = 'Psiquiatría',
  INTERNALMEDICINE = 'Medicina Interna',
}

registerEnumType(medicSpecialty, {
  name: 'MedicSpecialty',
});

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
  @Column({
    name: 'last_name',
  })
  lastName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field(() => medicSpecialty)
  @Column({ type: 'enum', enum: medicSpecialty })
  specialty: medicSpecialty;

  @Field()
  @Column({ default: true })
  enabled: boolean;

  @Field(() => [Schedule], { nullable: 'items' })
  @OneToMany(() => Schedule, (schedule) => schedule.medic)
  schedules: Schedule[];

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

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
}
