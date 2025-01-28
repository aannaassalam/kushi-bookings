import { Lane } from "./lane.interfaces";
import { Membership } from "./membership.interfaces";
import { SeasonPass } from "./season-pass.interfaces";
import { User } from "./user.interfaces";

export interface Booking {
  _id: string;
  user_id: string;
  user: User;
  membership_id: string;
  membership: Membership;
  sport: string;
  season_pass_id: string;
  season_pass: SeasonPass;
  slots: string[];
  date: string;
  note: string;
  lane_id: string;
  lane: Lane;
  box_booking_price: number;
  transaction_id: string;
  free_slots_used: number;
  price: number;
  is_cancelled: boolean;
  is_pending: boolean;
  createdAt: string;
}
