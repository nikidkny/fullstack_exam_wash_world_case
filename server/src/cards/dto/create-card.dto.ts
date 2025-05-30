export class CreateCardDto {
  user_id: number;
  cardholder_name: string;
  card_number: string;
  cvc: string;
  expiry_date: string;
}
