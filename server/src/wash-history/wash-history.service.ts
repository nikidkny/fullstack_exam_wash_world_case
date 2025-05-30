import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WashHistory } from './entities/wash-history.entity';
import { CreateWashHistoryDto } from './dto/create-wash-history.dto';
import { UpdateWashHistoryDto } from './dto/update-wash-history.dto';

@Injectable()
export class WashHistoryService {
  constructor(
    @InjectRepository(WashHistory)
    private washRepo: Repository<WashHistory>,
  ) {}

  create(dto: CreateWashHistoryDto) {
    const wash = this.washRepo.create(dto);
    return this.washRepo.save(wash);
  }

  findAll() {
    return this.washRepo.find();
  }

  findOne(id: number) {
    return this.washRepo.findOneBy({ id });
  }

  update(id: number, dto: UpdateWashHistoryDto) {
    return this.washRepo.update(id, dto);
  }

  remove(id: number) {
    return this.washRepo.delete(id);
  }
}
