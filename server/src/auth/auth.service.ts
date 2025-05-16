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

  //TODO test 
  async signup(body: SignupDto) {

    // Create User
    const responseUser = await this.userService.create(body.first_name, body.last_name, body.email, body.password, body.phone_number);

    console.log("User response:", responseUser); //TODO test once creating users
    
    // // Create LicensePlate
    // const responseLicensePlate = await this.licensePlateService.create(body.license_plate);

    // //TODO pass license plate in the following
    // // Create a membership
    // const responseLicensePlateMemberShipPlan = await this.licensePlateMembershipPlanService.create()
  };

}
