import { LicensePlateMembershipPlan } from 'src/license-plates_membership-plans/entities/license-plates_membership-plan.entity';
import { WashHistory } from 'src/wash-history/entities/wash-history.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('billings_history')
export class BillingsHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  card_id: number;

  @Column({ type: 'numeric', precision: 5, scale: 2 })
  price_total: number;

  @ManyToOne(() => LicensePlateMembershipPlan)
  @JoinColumn({ name: 'license_plate_membership_plan_id' })
  licensePlateMembershipPlan: LicensePlateMembershipPlan;

  @Column({ type: 'date' })
  payment_date: string;

  @Column({ default: false })
  is_fulfilled: boolean;

  @OneToMany(() => WashHistory, (wash) => wash.billingsHistory)
  washHistory: WashHistory[];
}
