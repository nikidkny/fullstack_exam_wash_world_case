import { Injectable } from '@nestjs/common';
import { CreateLicensePlatesMembershipPlanDto } from './dto/create-license-plates_membership-plan.dto';
import { UpdateLicensePlatesMembershipPlanDto } from './dto/update-license-plates_membership-plan.dto';

@Injectable()
export class LicensePlatesMembershipPlansService {
  create(
    createLicensePlatesMembershipPlanDto: CreateLicensePlatesMembershipPlanDto,
  ) {
    return 'This action adds a new licensePlatesMembershipPlan';
  }

  findAll() {
    return `This action returns all licensePlatesMembershipPlans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} licensePlatesMembershipPlan`;
  }

  update(
    id: number,
    updateLicensePlatesMembershipPlanDto: UpdateLicensePlatesMembershipPlanDto,
  ) {
    return `This action updates a #${id} licensePlatesMembershipPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} licensePlatesMembershipPlan`;
  }
}
