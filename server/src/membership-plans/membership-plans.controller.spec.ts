import { Test, TestingModule } from '@nestjs/testing';
import { MembershipPlansController } from './membership-plans.controller';
import { MembershipPlansService } from './membership-plans.service';

describe('MembershipPlansController', () => {
  let controller: MembershipPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembershipPlansController],
      providers: [MembershipPlansService],
    }).compile();

    controller = module.get<MembershipPlansController>(
      MembershipPlansController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
