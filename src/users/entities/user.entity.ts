import { Roles } from 'src/types/enums/user-roles.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  mobilePhone: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @Column({ default: Roles.GUEST })
  role: string;

  @Column({ type: 'timestamp without time zone', default: () => 'now()' })
  createdAt: string;
}
