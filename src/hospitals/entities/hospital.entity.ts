import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'hospitals' })
export class Hospital {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phoneNumbers: string;

  @Column({ type: 'timestamp without time zone', default: () => 'now()' })
  createdAt: string;
}
