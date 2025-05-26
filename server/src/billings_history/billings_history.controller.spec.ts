import { Test, TestingModule } from '@nestjs/testing';
import { BillingsHistoryController } from './billings_history.controller';
import { BillingsHistoryService } from './billings_history.service';

describe('BillingsHistoryController', () => {
  let controller: BillingsHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillingsHistoryController],
      providers: [BillingsHistoryService],
    }).compile();

    controller = module.get<BillingsHistoryController>(BillingsHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
