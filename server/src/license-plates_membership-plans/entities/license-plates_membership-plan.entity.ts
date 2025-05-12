// license-plate-membership.entity.ts
import { LicensePlate } from 'src/license-plates/entities/license-plate.entity';
import { MembershipPlan } from 'src/membership-plans/entities/membership-plan.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

@Entity('license_plates_membership_plans')
export class LicensePlateMembershipPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.licensePlateMembershipPlans)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    () => LicensePlate,
    (licensePlate) => licensePlate.licensePlateMembershipPlans,
  )
  @JoinColumn({ name: 'license_plate_id' })
  licensePlate: LicensePlate;

  @ManyToOne(
    () => MembershipPlan,
    (membershipPlan) => membershipPlan.licensePlateMembershipPlans,
  )
  @JoinColumn({ name: 'membership_plan_id' })
  membershipPlan: MembershipPlan;
}
