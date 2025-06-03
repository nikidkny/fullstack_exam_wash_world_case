import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MembershipPlansModule } from 'src/membership-plans/membership-plans.module';
import { LicensePlatesMembershipPlansModule } from 'src/license-plates_membership-plans/license-plates_membership-plans.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MembershipPlansModule,
    LicensePlatesMembershipPlansModule,],
  controllers: [UsersController],
  providers: [UsersService,],
  exports: [UsersService],
})
export class UsersModule { }
