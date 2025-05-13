import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async create(): Promise<void> {
    const response = await fetch(
      'https://washworld.dk/wp-json/ww/v1/locations?country=da&cacheBuster=17461100',
    );
    const data = await response.json();

    const firstTen = data.slice(0, 10);

    for (const item of firstTen) {
      const exists = await this.locationRepository.findOne({
        where: { name: item.name, address: item.address },
      });

      if (!exists) {
        const location = this.locationRepository.create({
          name: item.name,
          address: item.address,
          open_hours: item.open_hours || 'N/A',
          has_self_wash: item.service_units.self_wash.total_count === 1,
        });

        await this.locationRepository.save(location);
      }
    }
  }

  findAll() {
    return `This action returns all locations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  // update(id: number, updateLocationDto: UpdateLocationDto) {
  //   return `This action updates a #${id} location`;
  // }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
