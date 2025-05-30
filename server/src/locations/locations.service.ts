import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(): Promise<Location[]> {
    const locations = await this.locationRepository.find();

    return locations;
  }

  async findOne(id: number): Promise<Location> {
    const location = await this.locationRepository.findOne({ where: { id } });

    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    return location;
  }
  async update(id: number, updateData: Partial<Location>): Promise<Location> {
    const location = await this.findOne(id);

    const updated = Object.assign(location, updateData);
    return await this.locationRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const location = await this.findOne(id);
    await this.locationRepository.remove(location);
  }
}
