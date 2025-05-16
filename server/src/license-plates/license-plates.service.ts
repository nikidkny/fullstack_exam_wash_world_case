import { ConflictException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateLicensePlateDto } from './dto/create-license-plate.dto';
import { UpdateLicensePlateDto } from './dto/update-license-plate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LicensePlate } from './entities/license-plate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LicensePlatesService {

  constructor(
    @InjectRepository(LicensePlate)
    private licensPlatesRepository: Repository<LicensePlate>,
  ) { }

  async create(plate_number: string): Promise<LicensePlate> {
    try {

      const licensePlateFound = await this.findByPlate(plate_number);
      // Create LicensePlate if not exists
      if (licensePlateFound) {
        throw new ConflictException({
          statusCode: HttpStatus.CONFLICT,
          message: 'License Plate already registered',
        });
      };

      const newLicensePlate = this.licensPlatesRepository.create({
        plate_number
      });

      return await this.licensPlatesRepository.save(newLicensePlate);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to create licenseplate',
      });
    }
  }

  findAll() {
    return `This action returns all licensePlates`;
  }

  async findByPlate(plate: string) {
    const plateFound = await this.licensPlatesRepository.findOne({
      where: { plate_number: plate }
    });

    if (!plate) {
      throw new NotFoundException(`Car with plate ${plate} not found`);
    }

    return plateFound;
  }

  update(id: number, updateLicensePlateDto: UpdateLicensePlateDto) {
    return `This action updates a #${id} licensePlate`;
  }

  remove(id: number) {
    return `This action removes a #${id} licensePlate`;
  }
}
