import { Module } from '@nestjs/common';
import { MembershipPlansService } from './membership-plans.service';
import { MembershipPlansController } from './membership-plans.controller';
import { MembershipPlan } from './entities/membership-plan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MembershipPlan]),],
  controllers: [MembershipPlansController],
  providers: [MembershipPlansService],
  exports:[MembershipPlansService]
})
export class MembershipPlansModule {}
