import { Injectable, NotFoundException } from '@nestjs/common';
import { MembershipPlan } from './entities/membership-plan.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MembershipPlansService {
  constructor(
    @InjectRepository(MembershipPlan)
    private membershipPlanRepository: Repository<MembershipPlan>,
  ) { }

  async create() {
    const newPlan = this.membershipPlanRepository.create({
      name: 'gold',
      price: 139,
      is_business: false,
    });

    return await this.membershipPlanRepository.save(newPlan);
  }

  findAll() {
    return `This action returns all membershipPlans`;
  }
  async findById(id: number): Promise<MembershipPlan> {
    const membershipPlan = await this.membershipPlanRepository.findOne({
      where: { id }
    });

    if (!membershipPlan) {
      throw new NotFoundException(`membership plan  with ID ${id} not found`);
    }

    return membershipPlan;
  }

  // update(id: number, updateMembershipPlanDto: UpdateMembershipPlanDto) {
  //   return `This action updates a #${id} membershipPlan`;
  // }

  remove(id: number) {
    return `This action removes a #${id} membershipPlan`;
  }
}
