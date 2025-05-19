import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('tesGuard')
  async testGuard(@Request() req) {
    return { message: 'You have access!', user: req.user };
  }

  @Post('signup')
  async signup(@Body() body) {
    try {
      await this.authService.signup(body);
      return {
        statusCode: HttpStatus.OK,
        message: 'Singup successful',
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    try {
      const loginToken = await this.authService.login(
        body.email,
        body.password,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'login successful',
        data: loginToken,
      };
    } catch (error) {
      throw error;
    }
  }
}
