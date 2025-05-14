import { Injectable } from '@nestjs/common';
import { CreateLicensePlatesMembershipPlanDto } from './dto/create-license-plates_membership-plan.dto';
import { UpdateLicensePlatesMembershipPlanDto } from './dto/update-license-plates_membership-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LicensePlateMembershipPlan } from './entities/license-plates_membership-plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LicensePlatesMembershipPlansService {

  constructor(
    @InjectRepository(LicensePlateMembershipPlan)
    private licensePlateMembershipPlanRepository: Repository<LicensePlateMembershipPlan>
  ) { }

  create() {
    //TODO 
    // - create start date
    // - create end date
    // - get the user fro the param
    // - get the license plate from the param
    // - get the membership plan from the param
  }

  async findByPlateId(licensePlateId: number) {
    const found = await this.licensePlateMembershipPlanRepository.findOne({
      where: { licensePlate: { id: licensePlateId } },
    });

    return found;
  }
}
