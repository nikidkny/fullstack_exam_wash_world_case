import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateLicensePlatesMembershipPlanDto } from './dto/create-license-plates_membership-plan.dto';
import { UpdateLicensePlatesMembershipPlanDto } from './dto/update-license-plates_membership-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LicensePlateMembershipPlan } from './entities/license-plates_membership-plan.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { LicensePlate } from 'src/license-plates/entities/license-plate.entity';
import { MembershipPlansService } from 'src/membership-plans/membership-plans.service';

@Injectable()
export class LicensePlatesMembershipPlansService {
  constructor(
    @InjectRepository(LicensePlateMembershipPlan)
    private licensePlateMembershipPlanRepository: Repository<LicensePlateMembershipPlan>,
    private readonly membershipPlanService: MembershipPlansService,
  ) {}

  async create(
    user: User,
    licensePlate: LicensePlate,
    membership_plan_id: number,
  ) {
    try {
      //Check fields
      const invalidFields: string[] = [];

      if (!user?.id) invalidFields.push('user_id');
      if (!licensePlate?.id) invalidFields.push('license_plate_id');
      if (!membership_plan_id) invalidFields.push('membership_plan_id');

      if (invalidFields.length > 0) {
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Missing or invalid input values',
          values: invalidFields,
        });
      }

      // Check if user exists
      const lpmFound = await this.findByCompositeKey(
        user.id,
        licensePlate.id,
        membership_plan_id,
      );
      if (lpmFound) {
        throw new ConflictException({
          statusCode: HttpStatus.CONFLICT,
          message: 'membership already exists with this car',
        });
      }

      // Start Date
      const today = new Date();
      const start_date = new Date(today); // Copy to avoid mutation

      // End date
      const end_date = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      const membershipPlan =
        await this.membershipPlanService.findById(membership_plan_id);
      const lpm = this.licensePlateMembershipPlanRepository.create({
        start_date,
        end_date,
        is_active: true,
        user,
        licensePlate,
        membershipPlan,
      });

      console.log(lpm);

      return await this.licensePlateMembershipPlanRepository.save(lpm);
    } catch (e) {
      console.log(e);
      if (e instanceof BadRequestException || e instanceof ConflictException) {
        throw e;
      }
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to create membership',
        error: {
          message: e.message,
        },
      });
    }
  }

  async findByPlateId(licensePlateId: number) {
    const found = await this.licensePlateMembershipPlanRepository.findOne({
      where: { licensePlate: { id: licensePlateId } },
    });

    return found;
  }

  async findByCompositeKey(
    userId: number,
    licensePlateId: number,
    membershipPlanId: number,
  ) {
    return await this.licensePlateMembershipPlanRepository.findOne({
      where: {
        user: { id: userId },
        licensePlate: { id: licensePlateId },
        membershipPlan: { id: membershipPlanId },
      },
    });
  }
}
