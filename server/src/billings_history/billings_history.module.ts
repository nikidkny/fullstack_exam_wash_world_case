import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingsHistoryService } from './billings_history.service';
import { BillingsHistoryController } from './billings_history.controller';
import { BillingsHistory } from './entities/billings_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BillingsHistory])],
  controllers: [BillingsHistoryController],
  providers: [BillingsHistoryService],
  exports: [BillingsHistoryService],
})
export class BillingsHistoryModule {}
