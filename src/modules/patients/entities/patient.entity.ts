import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'patiens' })
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Column()
  gender: string;

  @Column()
  age: number;

  @Column()
  bornCity: string;

  @Column()
  bornCountry: string;

  @Column()
  address: string;

  @CreateDateColumn()
  createdAt: Date;
}
