import { PartialType } from '@nestjs/mapped-types';
import { CreateBillingsHistoryDto } from './create-billings_history.dto';

export class UpdateBillingsHistoryDto extends PartialType(
  CreateBillingsHistoryDto,
) {}
