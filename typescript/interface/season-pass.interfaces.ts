export interface SeasonPass {
  _id: string;
  name: string;
  about: string;
  sport: string;
  price: number;
  expires_in: number;
  number_of_slots: number;
  createdAt: string;
  updatedAt: string;
}

export interface CurrentSeasonPass {
  _id: string;
  season_pass_id: string;
  user_id: string;
  sport: string;
  available_slots: number;
  expiration_date: string;
  active: number;
  createdAt: string;
  updatedAt: string;
}
