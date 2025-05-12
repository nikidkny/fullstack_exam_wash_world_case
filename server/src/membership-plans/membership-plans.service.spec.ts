import { Test, TestingModule } from '@nestjs/testing';
import { MembershipPlansService } from './membership-plans.service';

describe('MembershipPlansService', () => {
  let service: MembershipPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembershipPlansService],
    }).compile();

    service = module.get<MembershipPlansService>(MembershipPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
