import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/auth/type/interfaces';
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(first_name: string, last_name: string, email: string, password:string, phone_number: number) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.usersRepository.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        phone_number
      });

      return await this.usersRepository.save(newUser);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to create user',
      });
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id }
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }



  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
