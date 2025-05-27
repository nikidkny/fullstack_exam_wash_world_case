import { LicensePlateMembershipPlan } from 'src/license-plates_membership-plans/entities/license-plates_membership-plan.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone_number: number;

  @OneToMany(
    () => LicensePlateMembershipPlan,
    (licensePlateMembershipPlans) => licensePlateMembershipPlans.user,
  )
  licensePlateMembershipPlans: LicensePlateMembershipPlan[];
}
