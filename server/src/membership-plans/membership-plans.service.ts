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
    //seeding the plans into the db, checking if they are already added to avoid duplicates
    const plans = [
      { name: 'gold', price: 139, is_business: false },
      { name: 'premium', price: 169, is_business: false },
      { name: 'brilliant/all inclusive', price: 199, is_business: false },
      { name: 'gold', price: 111.2, is_business: true },
      { name: 'premium', price: 135.2, is_business: true },
      { name: 'brilliant/all inclusive', price: 159.2, is_business: true },
    ];

    for (const plan of plans) {
      const existing = await this.membershipPlanRepository.findOne({
        where: { name: plan.name, is_business: plan.is_business },
      });

      if (!existing) {
        const newPlan = this.membershipPlanRepository.create(plan);
        await this.membershipPlanRepository.save(newPlan);
      }
    }
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
