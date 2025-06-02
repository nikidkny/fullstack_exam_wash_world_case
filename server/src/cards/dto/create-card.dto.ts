import { IsNumber, IsString } from 'class-validator';

export class CreateCardDto {
  @IsNumber()
  user: number;

  @IsString()
  cardholder_name: string;

  @IsString()
  card_number: string;

  @IsString()
  cvc: string;

  @IsString()
  expiry_date: string;
}
