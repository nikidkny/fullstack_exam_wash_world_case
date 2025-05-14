import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto, SignupDto } from './type/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signup(@Body() body: SignupDto) {
    try {
      const result = await this.authService.signup(body);
      return {
        statusCode: HttpStatus.OK,
        message: 'Singup successful',
        data: result,
      };
    } catch (error) {
      return {
        statusCode: error.status || 500,
        message: error.message || 'An error occurred during signup',
      };
    }
  }

  //TODO implement login logic with the db and replace the following logic
  // @Post('login')
  // async login(@Body() loginDto: LoginDto) {
  //   try {
  //     const result = await this.authService.login(loginDto);
  //     return {
  //       statusCode: HttpStatus.OK,
  //       message: 'Login successful',
  //       data: result,
  //     };
  //   } catch (error) {
  //     throw new HttpException(
  //       {
  //         statusCode: HttpStatus.UNAUTHORIZED,
  //         message: 'Invalid credentials',
  //       },
  //       HttpStatus.UNAUTHORIZED,
  //     );
  //   }
  // }
}
