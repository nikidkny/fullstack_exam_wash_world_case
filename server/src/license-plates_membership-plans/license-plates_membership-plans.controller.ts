import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LicensePlatesMembershipPlansService } from './license-plates_membership-plans.service';
import { CreateLicensePlatesMembershipPlanDto } from './dto/create-license-plates_membership-plan.dto';
import { UpdateLicensePlatesMembershipPlanDto } from './dto/update-license-plates_membership-plan.dto';

@Controller('license-plates-membership-plans')
export class LicensePlatesMembershipPlansController {
  constructor(
    private readonly licensePlatesMembershipPlansService: LicensePlatesMembershipPlansService,
  ) {}

}
