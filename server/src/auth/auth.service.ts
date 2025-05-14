import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
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
    // check if user exists
    const userFound = await this.userService.findByEmail(body.email);
    if (userFound) {
      throw new ConflictException({
        statusCode: HttpStatus.CONFLICT,
        message: 'User already exists with this email',
      });
    }
    const responseUser = await this.userService.create(body.first_name, body.last_name, body.email, body.password, body.phone_number);

    //create licenseplate
    const licensePlateFound = await this.licensePlateService.findByPlate(body.license_plate);
    let licensePlateObject = licensePlateFound;
    if (!licensePlateFound) {
      const responseLicensePlate = await this.licensePlateService.create(body.license_plate);
      licensePlateObject = responseLicensePlate;
    };

    // – create lincense_plates_membership_plans
    const licensePlateMembershipPlanFound = await this.licensePlateMembershipPlanService.findByPlateId(licensePlateObject.id)
    if (licensePlateMembershipPlanFound) {
      throw new ConflictException({
        statusCode: HttpStatus.CONFLICT,
        message: 'Car already has a membership',
      });
    }

    const responseLicensePlateMemberShipPlan = await this.licensePlateMembershipPlanService.create()

    //TODO finish logic and test
  };

}
