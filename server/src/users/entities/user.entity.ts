import { Card } from 'src/cards/entities/card.entity';
import { LicensePlateMembershipPlan } from 'src/license-plates_membership-plans/entities/license-plates_membership-plan.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Role } from '../role';

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

  @Column({
    type: "enum",
    enum: Role
  })
  role: Role;

  @OneToMany(
    () => LicensePlateMembershipPlan,
    (licensePlateMembershipPlans) => licensePlateMembershipPlans.user,
  )
  licensePlateMembershipPlans: LicensePlateMembershipPlan[];

  @OneToMany(() => Card, (card) => card.user)
  cards: Card[];
}
