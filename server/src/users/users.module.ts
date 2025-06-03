import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LicensePlate } from 'src/license-plates/entities/license-plate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, LicensePlate])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
