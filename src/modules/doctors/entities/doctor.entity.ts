import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
import { Room } from 'src/modules/rooms/entities/room.entity';
import { Specialization } from 'src/modules/specializations/entities/specialization.entity';
import { User } from 'src/modules/users/entities/user.entity';
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
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Specialization, (specialization) => specialization.doctors)
  @JoinColumn({ name: 'specializationId' })
  specialization: Specialization;

  @Column()
  specializationId: string;

  @OneToMany(() => Room, (room) => room.doctor)
  rooms: Room[];

  // @Column('uuid', { array: true, nullable: true })
  // associatedRooms: string[];

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment;

  @Column()
  level: string;

  @CreateDateColumn()
  createdAt: string;
}
