export interface UserRegisterBody {
  email: string;
  password: string;
  confirm_password: string;
  full_name: string;
  phone: number;
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
  memberships: unknown;
  status: number;
}
