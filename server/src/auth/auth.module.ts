import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use a strong secret or environment variable
      signOptions: { expiresIn: '1h' }, // Set token expiration (optional)
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
