export interface SeasonPass {
  _id: string;
  name: string;
  about: string;
  sport: string;
  price: number;
  stripe_price_id: string;
  recurring_frequency: number;
  expires_in: number;
  type: string;
  number_of_slots: number;
  createdAt: string;
  updatedAt: string;
}
