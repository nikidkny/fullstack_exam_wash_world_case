import { Test, TestingModule } from '@nestjs/testing';
import { LicensePlatesService } from './license-plates.service';

describe('LicensePlatesService', () => {
  let service: LicensePlatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LicensePlatesService],
    }).compile();

    service = module.get<LicensePlatesService>(LicensePlatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
