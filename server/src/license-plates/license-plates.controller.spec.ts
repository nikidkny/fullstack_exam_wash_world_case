import { Test, TestingModule } from '@nestjs/testing';
import { LicensePlatesController } from './license-plates.controller';
import { LicensePlatesService } from './license-plates.service';

describe('LicensePlatesController', () => {
  let controller: LicensePlatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LicensePlatesController],
      providers: [LicensePlatesService],
    }).compile();

    controller = module.get<LicensePlatesController>(LicensePlatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
