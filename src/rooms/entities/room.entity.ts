import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Specialization } from 'src/specializations/entities/specialization.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'rooms' })
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Doctor, (doctor) => doctor.rooms)
  @Column('character varying', { array: true })
  doctors: Doctor[];

  @CreateDateColumn()
  createdAt: string;
}
