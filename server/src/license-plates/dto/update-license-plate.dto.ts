import { PartialType } from '@nestjs/mapped-types';
import { CreateLicensePlateDto } from './create-license-plate.dto';

export class UpdateLicensePlateDto extends PartialType(CreateLicensePlateDto) {}
