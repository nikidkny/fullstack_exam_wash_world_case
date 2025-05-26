import { BillingsHistory } from 'src/billings_history/entities/billings_history.entity';
import { LicensePlateMembershipPlan } from 'src/license-plates_membership-plans/entities/license-plates_membership-plan.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('wash_history')
export class WashHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => LicensePlateMembershipPlan, (lpmp) => lpmp.washes)
  @JoinColumn({ name: 'license_plate_membership_plan_id' })
  licensePlateMembershipPlan: LicensePlateMembershipPlan;

  @Column()
  terminal_id: number;

  @Column()
  membership_plan: string;

  @Column()
  membership_used: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'numeric', precision: 5, scale: 2 })
  price_addons: number;

  @Column({ type: 'numeric', precision: 5, scale: 2 })
  price_membership: number;

  @ManyToOne(() => BillingsHistory, (billings) => billings.washHistory)
  @JoinColumn({ name: 'billings_history_id' })
  billingsHistory: BillingsHistory;
}
