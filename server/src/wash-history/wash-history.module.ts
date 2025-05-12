import { Module } from '@nestjs/common';
import { WashHistoryService } from './wash-history.service';
import { WashHistoryController } from './wash-history.controller';

@Module({
  controllers: [WashHistoryController],
  providers: [WashHistoryService],
})
export class WashHistoryModule {}
