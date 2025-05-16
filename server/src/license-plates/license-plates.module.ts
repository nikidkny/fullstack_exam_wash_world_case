import { Module } from '@nestjs/common';
import { LicensePlatesService } from './license-plates.service';
import { LicensePlatesController } from './license-plates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LicensePlate } from './entities/license-plate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LicensePlate])],
  controllers: [LicensePlatesController],
  providers: [LicensePlatesService],
  exports:[LicensePlatesService]
})
export class LicensePlatesModule {}
