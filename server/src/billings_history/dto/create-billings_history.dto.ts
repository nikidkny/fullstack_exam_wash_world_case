export class CreateBillingsHistoryDto {
  user_id: number;
  card_id: number;
  price_total: number;
  license_plate_membership_plan_id: number;
  payment_date: string;
  is_fulfilled: boolean;
}
