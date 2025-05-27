import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.cards)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  cardholder_name: string;

  @Column({ type: 'bigint' })
  card_number: string;

  @Column({ type: 'bigint' })
  cvc: string;

  @Column({ type: 'date' })
  expiry_date: string;
}
