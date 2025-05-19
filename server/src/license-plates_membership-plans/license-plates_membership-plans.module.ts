import { Module } from '@nestjs/common';
import { LicensePlatesMembershipPlansService } from './license-plates_membership-plans.service';
import { LicensePlatesMembershipPlansController } from './license-plates_membership-plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LicensePlateMembershipPlan } from './entities/license-plates_membership-plan.entity';
import { MembershipPlansModule } from 'src/membership-plans/membership-plans.module';

@Module({
  imports: [TypeOrmModule.forFeature([LicensePlateMembershipPlan]), MembershipPlansModule],
  controllers: [LicensePlatesMembershipPlansController],
  providers: [LicensePlatesMembershipPlansService],
  exports: [LicensePlatesMembershipPlansService]
})
export class LicensePlatesMembershipPlansModule { }
