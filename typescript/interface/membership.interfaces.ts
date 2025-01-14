export interface Membership {
  _id: string;
  name: string;
  about: string;
  sport: string;
  price: number;
  stripe_price_id: string;
  recurring_type: string;
  facility_price: number;
  type: string;
  number_of_free_slots_per_week: number;
  createdAt: string;
  updatedAt: string;
}

export interface CurrentMembership {
  _id: string;
  membership_id: string;
  user_id: string;
  sport: string;
  available_slots: number;
  facility_feature_price: number;
  type: string;
  active: number;
  subscription_id: string;
  createdAt: string;
  updatedAt: string;
}
