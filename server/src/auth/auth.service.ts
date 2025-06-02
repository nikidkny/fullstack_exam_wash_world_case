import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LicensePlatesService } from 'src/license-plates/license-plates.service';
import { LicensePlatesMembershipPlansService } from 'src/license-plates_membership-plans/license-plates_membership-plans.service';
import { SignupDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly licensePlateService: LicensePlatesService,
    private readonly licensePlateMembershipPlanService: LicensePlatesMembershipPlansService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(body: SignupDto) {
    console.log(body);

    // try {
    // // Create LicensePlate
    const responseLicensePlate = await this.licensePlateService.create(
      body.plate_number,
    );

    // Create User
    const responseUser = await this.userService.create(
      body.first_name,
      body.last_name,
      body.email,
      body.password,
      body.phone_number,
    );

    // Create a membership
    const responseLicensePlateMemberShipPlan =
      await this.licensePlateMembershipPlanService.create(
        responseUser,
        responseLicensePlate,
        body.membership_plan_id,
      );
    // } catch (error) {
    //   throw error;
    // }
    return responseLicensePlateMemberShipPlan;
  }

  async login(email: string, password: string) {
    //Check fields
    const invalidFields: string[] = [];

    if (!email?.trim()) invalidFields.push('email');
    if (!password?.trim()) invalidFields.push('password');

    if (invalidFields.length > 0) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,

        message: 'Missing or invalid values',

        values: invalidFields,
      });
    }

    // Check if user exists
    const userFound = await this.userService.findByEmail(email);
    if (!userFound) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'User does not exists',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    if (!isPasswordValid) {
      throw new BadRequestException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }

    const payload = { sub: userFound.id, email: userFound.email };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: userFound.id,
        email: userFound.email,
        first_name: userFound.first_name,
        last_name: userFound.last_name,
        phone_number: userFound.phone_number,
      },
    };
  }
}
