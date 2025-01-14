import {
  User,
  UserLoginBody,
  UserRegisterBody
} from "@/typescript/interface/user.interfaces";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const signup = async (body: UserRegisterBody) => {
  const res = await axiosInstance.post(endpoints.user.register, body);
  return res.data;
};

export const login = async (body: UserLoginBody) => {
  const res = await axiosInstance.post(endpoints.user.login, body);
  return res.data;
};

export const getProfile = async (): Promise<User> => {
  const res = await axiosInstance.get(endpoints.user.profile);
  return res.data;
};
