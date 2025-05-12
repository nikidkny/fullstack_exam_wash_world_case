import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MembershipPlansService } from './membership-plans.service';
import { CreateMembershipPlanDto } from './dto/create-membership-plan.dto';
import { UpdateMembershipPlanDto } from './dto/update-membership-plan.dto';

@Controller('membership-plans')
export class MembershipPlansController {
  constructor(
    private readonly membershipPlansService: MembershipPlansService,
  ) {}

  @Post()
  create(@Body() createMembershipPlanDto: CreateMembershipPlanDto) {
    return this.membershipPlansService.create(createMembershipPlanDto);
  }

  @Get()
  findAll() {
    return this.membershipPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membershipPlansService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMembershipPlanDto: UpdateMembershipPlanDto,
  ) {
    return this.membershipPlansService.update(+id, updateMembershipPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membershipPlansService.remove(+id);
  }
}
