export class createCardDto {
  constructor(
    public user_id: number,
    public card_number: string,
    public cardholder_name: string,
    public expiry_date: string,
    public cvc: string
  ) {}
}
