import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from '../data.source';
import { UsersModule } from './users/users.module';
import { LocationsModule } from './locations/locations.module';
import { LicensePlatesModule } from './license-plates/license-plates.module';
import { WashHistoryModule } from './wash-history/wash-history.module';
import { LicensePlatesMembershipPlansModule } from './license-plates_membership-plans/license-plates_membership-plans.module';
import { MembershipPlansModule } from './membership-plans/membership-plans.module';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { BillingsHistoryModule } from './billings_history/billings_history.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dbConfig),
    UsersModule,
    LocationsModule,
    LicensePlatesModule,
    WashHistoryModule,
    LicensePlatesMembershipPlansModule,
    MembershipPlansModule,
    AuthModule,
    CardsModule,
    BillingsHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
