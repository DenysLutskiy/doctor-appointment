import { Roles } from 'src/types/enums/user-roles.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  mobilePhone: string;

  @Column({ nullable: true, unique: true })
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
