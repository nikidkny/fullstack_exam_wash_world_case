import { Test, TestingModule } from '@nestjs/testing';
import { LicensePlatesMembershipPlansService } from './license-plates_membership-plans.service';

describe('LicensePlatesMembershipPlansService', () => {
  let service: LicensePlatesMembershipPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LicensePlatesMembershipPlansService],
    }).compile();

    service = module.get<LicensePlatesMembershipPlansService>(
      LicensePlatesMembershipPlansService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
