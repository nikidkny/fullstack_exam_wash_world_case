import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { log } from 'console';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  async getAll() {
    try {
      const usersFound = await this.usersService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Users successful',
        data: usersFound,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('/email/:email')
  async findByEmail(@Param('email') email: string) {
    try {
      const userFound = await this.usersService.findByEmail(email);
      return {
        statusCode: HttpStatus.OK,
        message: 'login successful',
        data: userFound,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    try {
      const userFound = await this.usersService.findById(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'User found',
        data: userFound,
      };
    } catch (error) {
      throw error;
    }

  }
}
