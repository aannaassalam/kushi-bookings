import { CurrentMembership } from "./membership.interfaces";
import { CurrentSeasonPass } from "./season-pass.interfaces";

export interface UserRegisterBody {
  email: string;
  password: string;
  confirm_password: string;
  full_name: string;
  phone: number;
  profile_photo: File;
}

export interface UserLoginBody {
  email: string;
  password: string;
}

export interface User {
  full_name: string;
  email: string;
  phone: number;
  password: string;
  profile_photo: string;
  status: number;
}

export interface PublicUserProfile extends User {
  membership: CurrentMembership;
  season_passes: CurrentSeasonPass[];
}
