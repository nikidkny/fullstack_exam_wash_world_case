import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post('seed')
  async seedLocation() {
    return await this.locationsService.create();
  }

  @Get()
  async findAll() {
    return await this.locationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.locationsService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateData: Partial<Location>,
  // ): Promise<Location> {
  //   return this.locationsService.update(id, updateData);
  // }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.locationsService.remove(id);
  }
}
