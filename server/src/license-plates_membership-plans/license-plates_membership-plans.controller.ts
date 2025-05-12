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

  @Post()
  create(
    @Body()
    createLicensePlatesMembershipPlanDto: CreateLicensePlatesMembershipPlanDto,
  ) {
    return this.licensePlatesMembershipPlansService.create(
      createLicensePlatesMembershipPlanDto,
    );
  }

  @Get()
  findAll() {
    return this.licensePlatesMembershipPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.licensePlatesMembershipPlansService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateLicensePlatesMembershipPlanDto: UpdateLicensePlatesMembershipPlanDto,
  ) {
    return this.licensePlatesMembershipPlansService.update(
      +id,
      updateLicensePlatesMembershipPlanDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.licensePlatesMembershipPlansService.remove(+id);
  }
}
