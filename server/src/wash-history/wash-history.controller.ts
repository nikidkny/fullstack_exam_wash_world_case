import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WashHistoryService } from './wash-history.service';
import { CreateWashHistoryDto } from './dto/create-wash-history.dto';
import { UpdateWashHistoryDto } from './dto/update-wash-history.dto';

@Controller('wash-history')
export class WashHistoryController {
  constructor(private readonly washService: WashHistoryService) {}

  @Post()
  create(@Body() dto: CreateWashHistoryDto) {
    return this.washService.create(dto);
  }

  @Get()
  findAll() {
    return this.washService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.washService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWashHistoryDto) {
    return this.washService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.washService.remove(+id);
  }
}
