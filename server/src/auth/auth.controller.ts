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
import { JwtAuthGuard } from './jwt/jwt.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';;
import { LoginDto } from './dto/login-user.dto';
import { LoginSwaggerDto } from './login-user.dto';
import { SignupSwaggerDto } from './signup-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('tesGuard')
  async testGuard(@Request() req) {
    return { message: 'You have access!', user: req.user };
  }

  @Post('signup')
  @ApiOperation({ summary: 'User signup' })
  @ApiBody({ type: SignupSwaggerDto })
  @ApiResponse({
    status: 200,
    description: 'Signup successful',
    schema: {
      example: {
        statusCode: 200,
        message: 'Signup successful',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Missing or invalid fields',
    schema: {
      example: {
        statusCode: 400,
        message: 'Missing or invalid input values',
        values: ['email', 'plate_number'],
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Duplicate user or license plate',
    schema: {
      example: {
        statusCode: 409,
        message: 'User already exists with this email',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected server error',
    schema: {
      example: {
        statusCode: 500,
        message: 'Failed to create user',
        error: {
          message: 'Database connection failed',
        },
      },
    },
  })
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
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginSwaggerDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        statusCode: 200,
        message: 'login successful',
        data: {
          access_token: 'jwt.token.here',
          user: {
            id: 1,
            email: 'john@email.com',
            first_name: 'John',
            last_name: 'Doe',
            phone_number: 123456789,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Missing fields or user does not exist',
    schema: {
      example: {
        statusCode: 400,
        message: 'Missing or invalid values',
        values: ['email', 'password'],
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
    schema: {
      example: {
        statusCode: 401,
        message: 'Invalid credentials',
      },
    },
  })
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
