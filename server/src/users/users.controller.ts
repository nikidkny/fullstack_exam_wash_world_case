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

  @Get(':email')
  async findByEmail(@Param('email') email: string) {;
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
}
