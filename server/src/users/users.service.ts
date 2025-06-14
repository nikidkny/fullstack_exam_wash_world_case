import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    try {
      const usersFound = await this.usersRepository.find();
      if (!usersFound) {
        throw new NotFoundException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: `users  not found`,
        });
      }

      return usersFound;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    phone_number: number,
  ) {
    try {
      //Check fields
      const invalidFields: string[] = [];

      if (!first_name?.trim()) invalidFields.push('first_name');
      if (!last_name?.trim()) invalidFields.push('last_name');
      if (!email?.trim()) invalidFields.push('email');
      if (!password?.trim()) invalidFields.push('password');
      if (phone_number == null) invalidFields.push('phone_number');

      if (invalidFields.length > 0) {
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Missing or invalid input values',
          values: invalidFields,
        });
      }

      // Check if user exists

      const userFound = await this.usersRepository.findOne({
        where: { email },
      });

      if (userFound) {
        throw new ConflictException({
          statusCode: HttpStatus.CONFLICT,
          message: 'User already exists with this email',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.usersRepository.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        phone_number,
      });

      return await this.usersRepository.save(newUser);
    } catch (e) {
      console.log(e);
      if (e instanceof BadRequestException || e instanceof ConflictException) {
        throw e;
      }
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to create user',
        error: {
          message: e.message,
        },
      });
    }
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userFound = await this.usersRepository.findOne({ where: { email } });

    if (!userFound) {
      throw new NotFoundException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `User with email ${email} does not exists`,
      });
    }

    return userFound;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository
      .findOne({ where: { id } })
      .then(async (user) => {
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }

        // If password is being updated, hash it
        if (updateUserDto.password) {
          updateUserDto.password = await bcrypt.hash(
            updateUserDto.password,
            10,
          );
        }
        console.log('updateUserDto in users/update', updateUserDto);
        console.log('user in users/update', user);
        Object.assign(user, updateUserDto);
        console.log('user after assign in users/update', user);
        return this.usersRepository.save(user);
      });
  }

  remove(id: number) {
    return this.usersRepository
      .findOne({ where: { id } })
      .then(async (user) => {
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return this.usersRepository.remove(user);
      });
  }
}
