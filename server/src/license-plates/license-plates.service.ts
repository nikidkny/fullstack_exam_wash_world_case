import { Injectable } from '@nestjs/common';
import { CreateLicensePlateDto } from './dto/create-license-plate.dto';
import { UpdateLicensePlateDto } from './dto/update-license-plate.dto';

@Injectable()
export class LicensePlatesService {
  create(createLicensePlateDto: CreateLicensePlateDto) {
    return 'This action adds a new licensePlate';
  }

  findAll() {
    return `This action returns all licensePlates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} licensePlate`;
  }

  update(id: number, updateLicensePlateDto: UpdateLicensePlateDto) {
    return `This action updates a #${id} licensePlate`;
  }

  remove(id: number) {
    return `This action removes a #${id} licensePlate`;
  }
}
