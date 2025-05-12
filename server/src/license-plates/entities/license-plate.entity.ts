// license-plate.entity.ts
import { LicensePlateMembershipPlan } from 'src/license-plates_membership-plans/entities/license-plates_membership-plan.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('license_plates')
export class LicensePlate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plate_number: string;

  @OneToMany(
    () => LicensePlateMembershipPlan,
    (licensePlateMembershipPlans) => licensePlateMembershipPlans.licensePlate,
  )
  licensePlateMembershipPlans: LicensePlateMembershipPlan[];
}
