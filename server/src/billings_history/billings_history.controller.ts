import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BillingsHistoryService } from './billings_history.service';
import { CreateBillingsHistoryDto } from './dto/create-billings_history.dto';
import { UpdateBillingsHistoryDto } from './dto/update-billings_history.dto';

@Controller('billings-history')
export class BillingsHistoryController {
  constructor(private readonly billingsService: BillingsHistoryService) {}

  @Post()
  create(@Body() dto: CreateBillingsHistoryDto) {
    return this.billingsService.create(dto);
  }

  @Get()
  findAll() {
    return this.billingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBillingsHistoryDto) {
    return this.billingsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billingsService.remove(+id);
  }
}
