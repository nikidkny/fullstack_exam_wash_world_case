import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signup(@Body() body) {
    try {
      await this.authService.signup(body);
      return {
        statusCode: HttpStatus.OK,
        message: 'Singup successful'
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    try {
      const loginToken = await this.authService.login(body.email, body.password);
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
