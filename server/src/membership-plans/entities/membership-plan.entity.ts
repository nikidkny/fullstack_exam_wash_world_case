import { LicensePlateMembershipPlan } from 'src/license-plates_membership-plans/entities/license-plates_membership-plan.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('membership_plans')
export class MembershipPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isBusiness: boolean;

  @Column()
  price: number;

  @OneToMany(
    () => LicensePlateMembershipPlan,
    (licensePlateMembershipPlans) => licensePlateMembershipPlans.membershipPlan,
  )
  licensePlateMembershipPlans: LicensePlateMembershipPlan[];
}
