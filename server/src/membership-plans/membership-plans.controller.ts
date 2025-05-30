import { Controller, Get, Post, Param, Delete, HttpStatus } from '@nestjs/common';
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

  @Get()

  async findAll() {
    try {
      const membershipPlansFound = await this.membershipPlansService.findAll();
        return {
            statusCode: HttpStatus.OK,
            message: 'Membership Plan successful',
            data: membershipPlansFound,
          };
    } catch (error) {
      throw error;
    }
  };


}
