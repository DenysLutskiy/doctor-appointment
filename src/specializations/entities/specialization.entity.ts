import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'hospitals' })
export class Specialization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'timestamp without time zone', default: () => 'now()' })
  createdAt: string;
}
