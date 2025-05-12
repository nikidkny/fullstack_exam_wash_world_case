import { Module } from '@nestjs/common';
import { LicensePlatesMembershipPlansService } from './license-plates_membership-plans.service';
import { LicensePlatesMembershipPlansController } from './license-plates_membership-plans.controller';

@Module({
  controllers: [LicensePlatesMembershipPlansController],
  providers: [LicensePlatesMembershipPlansService],
})
export class LicensePlatesMembershipPlansModule {}
