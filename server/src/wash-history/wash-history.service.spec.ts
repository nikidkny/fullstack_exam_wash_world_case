import { Test, TestingModule } from '@nestjs/testing';
import { WashHistoryService } from './wash-history.service';

describe('WashHistoryService', () => {
  let service: WashHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WashHistoryService],
    }).compile();

    service = module.get<WashHistoryService>(WashHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
