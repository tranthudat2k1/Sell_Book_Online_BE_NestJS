import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Promotion } from './promotion.entity';
import { Invoice } from './invoice.entity';
import { StatusInvoice } from './status_invoice.entity';

@Entity({ name: 'staff' })
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  staff_id: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  avatar: string;

  @Column({ type: 'nvarchar', length: 30 })
  first_name: string;

  @Column({ type: 'nvarchar', length: 30 })
  last_name: string;

  @Column({ type: 'tinyint', width: 2 })
  gender: boolean;

  @Column({ type: 'nvarchar', length: 250 })
  address: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth: Date;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'char', length: 10 })
  phone_number: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 20 })
  role: string;

  @OneToMany(() => Promotion, (promotion) => promotion.staff_id_create)
  promotions: Promotion[];

  @OneToMany(() => StatusInvoice, (statusInvoice) => statusInvoice.staff)
  statusInvoices: StatusInvoice[];

  @Column({ type: 'varchar', length: 200, nullable: true })
  hashedRt: string;
}
