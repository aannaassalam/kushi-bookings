import { Membership } from "@/typescript/interface/membership.interfaces";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const getMemberships = async (sport: string): Promise<Membership[]> => {
  const res = await axiosInstance.get(endpoints.membership.get_all, {
    params: { sport }
  });
  return res.data;
};
