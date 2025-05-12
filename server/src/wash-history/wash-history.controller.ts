import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WashHistoryService } from './wash-history.service';
import { CreateWashHistoryDto } from './dto/create-wash-history.dto';
import { UpdateWashHistoryDto } from './dto/update-wash-history.dto';

@Controller('wash-history')
export class WashHistoryController {
  constructor(private readonly washHistoryService: WashHistoryService) {}

  @Post()
  create(@Body() createWashHistoryDto: CreateWashHistoryDto) {
    return this.washHistoryService.create(createWashHistoryDto);
  }

  @Get()
  findAll() {
    return this.washHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.washHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWashHistoryDto: UpdateWashHistoryDto) {
    return this.washHistoryService.update(+id, updateWashHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.washHistoryService.remove(+id);
  }
}
