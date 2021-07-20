import { Specialization } from 'src/specializations/entities/specialization.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'doctors' })
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Specialization)
  @JoinColumn()
  specialization: Specialization;

  @Column()
  level: string;

  @CreateDateColumn()
  createdAt: string;
}
