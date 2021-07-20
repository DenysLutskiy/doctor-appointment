import { Room } from 'src/rooms/entities/room.entity';
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

@Entity({ name: 'doctors' })
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Specialization, (specialization) => specialization.doctors)
  @JoinColumn({ name: 'specializationId' })
  specialization: Specialization;

  @Column()
  specializationId: string;

  @Column()
  level: string;

  @ManyToOne(() => Room, (room) => room.doctors)
  rooms: Room;

  @CreateDateColumn()
  createdAt: string;
}
