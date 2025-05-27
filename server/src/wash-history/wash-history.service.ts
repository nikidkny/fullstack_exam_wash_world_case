import { Injectable } from '@nestjs/common';
import { CreateWashHistoryDto } from './dto/create-wash-history.dto';
import { UpdateWashHistoryDto } from './dto/update-wash-history.dto';

@Injectable()
export class WashHistoryService {
  create(createWashHistoryDto: CreateWashHistoryDto) {
    return 'This action adds a new washHistory';
  }

  findAll() {
    return `This action returns all washHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} washHistory`;
  }

  update(id: number, updateWashHistoryDto: UpdateWashHistoryDto) {
    return `This action updates a #${id} washHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} washHistory`;
  }
}
