import { Module } from '@nestjs/common';
import { LicensePlatesService } from './license-plates.service';
import { LicensePlatesController } from './license-plates.controller';

@Module({
  controllers: [LicensePlatesController],
  providers: [LicensePlatesService],
})
export class LicensePlatesModule {}
