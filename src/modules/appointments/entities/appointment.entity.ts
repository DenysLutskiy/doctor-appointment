import { Doctor } from 'src/modules/doctors/entities/doctor.entity';
import { Patient } from 'src/modules/patients/entities/patient.entity';
import { Room } from 'src/modules/rooms/entities/room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'appointments' })
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @Column()
  patientId: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.rooms)
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;

  @Column()
  doctorId: string;

  @ManyToMany(() => Room)
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @Column()
  roomId: string;

  @Column('timestamp without time zone')
  appointmentStart: Date;

  @Column('timestamp without time zone')
  appointmentEnd: Date;

  @Column()
  duration: number;

  @CreateDateColumn()
  createdAt: string;
}
