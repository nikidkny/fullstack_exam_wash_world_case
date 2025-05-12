import { Test, TestingModule } from '@nestjs/testing';
import { WashHistoryController } from './wash-history.controller';
import { WashHistoryService } from './wash-history.service';

describe('WashHistoryController', () => {
  let controller: WashHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WashHistoryController],
      providers: [WashHistoryService],
    }).compile();

    controller = module.get<WashHistoryController>(WashHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
