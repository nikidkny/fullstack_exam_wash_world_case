import { Test, TestingModule } from '@nestjs/testing';
import { BillingsHistoryService } from './billings_history.service';

describe('BillingsHistoryService', () => {
  let service: BillingsHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillingsHistoryService],
    }).compile();

    service = module.get<BillingsHistoryService>(BillingsHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
