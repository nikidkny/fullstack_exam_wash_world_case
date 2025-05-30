import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { LicensePlatesModule } from 'src/license-plates/license-plates.module';
import { LicensePlatesMembershipPlansModule } from 'src/license-plates_membership-plans/license-plates_membership-plans.module';
import { MembershipPlansModule } from 'src/membership-plans/membership-plans.module';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
    LicensePlatesModule,
    LicensePlatesMembershipPlansModule,

    MembershipPlansModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
