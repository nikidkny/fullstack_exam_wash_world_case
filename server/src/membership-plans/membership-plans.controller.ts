import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { MembershipPlansService } from './membership-plans.service';

@Controller('membership-plans')
export class MembershipPlansController {
  constructor(
    private readonly membershipPlansService: MembershipPlansService,
  ) {}

  @Post('seed')
  async seedMembershipPlans() {
    return await this.membershipPlansService.create();
  }

  // @Post()
  // create(@Body() createMembershipPlanDto: CreateMembershipPlanDto) {
  //   return this.membershipPlansService.create(createMembershipPlanDto);
  // }

  @Get()
  findAll() {
    return this.membershipPlansService.findAll();
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateMembershipPlanDto: UpdateMembershipPlanDto,
  // ) {
  //   return this.membershipPlansService.update(+id, updateMembershipPlanDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membershipPlansService.remove(+id);
  }
}
