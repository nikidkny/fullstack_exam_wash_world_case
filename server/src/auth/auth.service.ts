import { Body, ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { SignupDto } from './type/interfaces';
import { UsersService } from 'src/users/users.service';
import { LicensePlatesService } from 'src/license-plates/license-plates.service';
import { LicensePlatesMembershipPlansService } from 'src/license-plates_membership-plans/license-plates_membership-plans.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly licensePlateService: LicensePlatesService,
    private readonly licensePlateMembershipPlanService: LicensePlatesMembershipPlansService
  ) { }

  async signup(body: SignupDto) {
    // Create User
    const responseUser = await this.userService.create(body.first_name, body.last_name, body.email, body.password, body.phone_number);

    // // Create LicensePlate
    const responseLicensePlate = await this.licensePlateService.create(body.plate_number);

    // Create a membership
    const responseLicensePlateMemberShipPlan = await this.licensePlateMembershipPlanService.create(responseUser, responseLicensePlate, body.membership_plan_id)
  };

}
