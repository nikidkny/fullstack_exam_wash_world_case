import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LicensePlatesService } from './license-plates.service';
import { CreateLicensePlateDto } from './dto/create-license-plate.dto';
import { UpdateLicensePlateDto } from './dto/update-license-plate.dto';

@Controller('license-plates')
export class LicensePlatesController {
  constructor(private readonly licensePlatesService: LicensePlatesService) {}

  @Post()
  create(@Body() createLicensePlateDto: CreateLicensePlateDto) {
    // return this.licensePlatesService.create(createLicensePlateDto);
  }

  @Get()
  findAll() {
    return this.licensePlatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.licensePlatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLicensePlateDto: UpdateLicensePlateDto) {
    return this.licensePlatesService.update(+id, updateLicensePlateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.licensePlatesService.remove(+id);
  }
}
