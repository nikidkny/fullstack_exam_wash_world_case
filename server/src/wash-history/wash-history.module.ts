import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WashHistory } from './entities/wash-history.entity';
import { WashHistoryService } from './wash-history.service';
import { WashHistoryController } from './wash-history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WashHistory])],
  providers: [WashHistoryService],
  controllers: [WashHistoryController],
})
export class WashHistoryModule {}
