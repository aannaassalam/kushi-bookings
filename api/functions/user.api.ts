import {
  PublicUserProfile,
  User,
  UserLoginBody,
  UserRegisterBody
} from "@/typescript/interface/user.interfaces";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const signup = async (body: UserRegisterBody) => {
  const formData = new FormData();
  Object.entries(body).forEach((data) => formData.append(data[0], data[1]));
  const res = await axiosInstance.post(endpoints.user.register, formData);
  return res.data;
};

export const login = async (body: UserLoginBody) => {
  const res = await axiosInstance.post(endpoints.user.login, body);
  return res.data;
};

export const forgotPassword = async (email: string) => {
  const res = await axiosInstance.post(endpoints.user.forgot_password, {
    email
  });
  return res.data;
};

export const resetPassword = async ({
  password,
  token
}: {
  password: string;
  token?: string;
}) => {
  const res = await axiosInstance.post(
    endpoints.user.reset_password,
    {
      password
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return res.data;
};

export const getProfile = async (token?: string): Promise<User> => {
  const res = await axiosInstance.get(endpoints.user.profile, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`
        }
      : {}
  });
  return res.data;
};

export const updateProfile = async (
  body: Pick<User, "full_name" | "email" | "phone"> & { profile_photo?: File }
) => {
  const formData = new FormData();
  Object.entries(body).forEach((data) =>
    formData.append(
      data[0],
      data[1] instanceof Blob ? data[1] : data[1].toString()
    )
  );
  const res = await axiosInstance.post(endpoints.user.update_profile, formData);
  return res.data;
};

export const changePassword = async (password: string) => {
  const res = await axiosInstance.post(endpoints.user.change_password, {
    password
  });
  return res.data;
};

export const getPublicProfile = async (
  user_id: string,
  sport: string
): Promise<PublicUserProfile> => {
  const res = await axiosInstance.get(endpoints.user.get_public_profile, {
    params: {
      user_id,
      sport
    }
  });

  return res.data;
};

// Advertise

interface AdvertiseFormBody {
  full_name: string;
  email: string;
  nature_of_business: string;
}

export const submitAdvertiseForm = async (body: AdvertiseFormBody) => {
  const res = await axiosInstance.post(endpoints.advertise.submit_form, body);
  return res.data;
};
