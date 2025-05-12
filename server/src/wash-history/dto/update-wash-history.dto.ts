import { PartialType } from '@nestjs/mapped-types';
import { CreateWashHistoryDto } from './create-wash-history.dto';

export class UpdateWashHistoryDto extends PartialType(CreateWashHistoryDto) {}
