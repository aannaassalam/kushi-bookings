import {
  CurrentMembership,
  Membership
} from "@/typescript/interface/membership.interfaces";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const getMemberships = async (sport: string): Promise<Membership[]> => {
  const res = await axiosInstance.get(endpoints.membership.get_all, {
    params: { sport }
  });
  return res.data;
};

export const getCurrentMembership = async (
  sport: string,
  token?: string
): Promise<CurrentMembership> => {
  const res = await axiosInstance.get(
    endpoints.purchased_membership.current_subscription,
    {
      headers: token
        ? {
            Authorization: `Bearer ${token}`
          }
        : {},
      params: {
        sport
      }
    }
  );
  return res.data;
};
