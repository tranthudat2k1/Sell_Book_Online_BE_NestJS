import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './account.entity';

@Entity({ name: 'staff' })
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  staff_id: string;

  @Column({ type: 'nvarchar', length: 30 })
  first_name: string;

  @Column({ type: 'nvarchar', length: 30 })
  last_name: string;

  @Column({ type: 'bool' })
  gender: boolean;

  @Column({ type: 'nvarchar', length: 250 })
  address: string;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column({ type: 'char', length: 10 })
  phone_number: string;

  @OneToOne(() => Account)
  @JoinColumn()
  account: Account;
}
