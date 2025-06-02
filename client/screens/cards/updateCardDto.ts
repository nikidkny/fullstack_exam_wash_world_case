export class updateCardDto {
  constructor(
    public cardholder_name?: string,
    public card_number?: string,
    public expiry_date?: string,
    public cvc?: string
  ) {}
}
