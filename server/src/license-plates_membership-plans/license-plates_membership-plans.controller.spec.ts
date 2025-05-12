import { Test, TestingModule } from '@nestjs/testing';
import { LicensePlatesMembershipPlansController } from './license-plates_membership-plans.controller';
import { LicensePlatesMembershipPlansService } from './license-plates_membership-plans.service';

describe('LicensePlatesMembershipPlansController', () => {
  let controller: LicensePlatesMembershipPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LicensePlatesMembershipPlansController],
      providers: [LicensePlatesMembershipPlansService],
    }).compile();

    controller = module.get<LicensePlatesMembershipPlansController>(
      LicensePlatesMembershipPlansController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
