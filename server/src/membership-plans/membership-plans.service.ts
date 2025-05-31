import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { MembershipPlan } from './entities/membership-plan.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MembershipPlansService {
  constructor(
    @InjectRepository(MembershipPlan)
    private membershipPlanRepository: Repository<MembershipPlan>,
  ) {}

  async create() {
    //seeding the plans into the db, checking if they are already added to avoid duplicates
    const plans = [
      { name: 'Gold', price: 139, is_business: false },
      { name: 'Premium', price: 169, is_business: false },
      { name: 'Brilliant (All Inclusive)', price: 199, is_business: false },
      { name: 'Gold Business', price: 111, is_business: true },
      { name: 'Premium Business', price: 135, is_business: true },
      {
        name: 'Brilliant (All Inclusive) Business',
        price: 159,
        is_business: true,
      },
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

  async findAll(): Promise<MembershipPlan[]> {
    try {
      const membershipPlansFound = await this.membershipPlanRepository.find();
      if (!membershipPlansFound) {
        throw new NotFoundException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Membership plans not found`,
        });
      }

      return membershipPlansFound;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findById(id: number): Promise<MembershipPlan> {
    const membershipPlan = await this.membershipPlanRepository.findOne({
      where: { id },
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
