import { PartialType } from '@nestjs/mapped-types';
import { CreateLicensePlatesMembershipPlanDto } from './create-license-plates_membership-plan.dto';

export class UpdateLicensePlatesMembershipPlanDto extends PartialType(
  CreateLicensePlatesMembershipPlanDto,
) {}
