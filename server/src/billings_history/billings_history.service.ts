import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBillingsHistoryDto } from './dto/create-billings_history.dto';
import { UpdateBillingsHistoryDto } from './dto/update-billings_history.dto';
import { BillingsHistory } from './entities/billings_history.entity';

@Injectable()
export class BillingsHistoryService {
  constructor(
    @InjectRepository(BillingsHistory)
    private billingsRepo: Repository<BillingsHistory>,
  ) {}

  create(dto: CreateBillingsHistoryDto) {
    const billings = this.billingsRepo.create(dto);
    return this.billingsRepo.save(billings);
  }

  findAll() {
    return this.billingsRepo.find();
  }

  findOne(id: number) {
    return this.billingsRepo.findOneBy({ id });
  }

  update(id: number, dto: UpdateBillingsHistoryDto) {
    return this.billingsRepo.update(id, dto);
  }

  remove(id: number) {
    return this.billingsRepo.delete(id);
  }
}
