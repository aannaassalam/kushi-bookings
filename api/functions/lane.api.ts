import { Lane } from "@/typescript/interface/lane.interfaces";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const getLanes = async (
  sport: string | null,
  token?: string
): Promise<Lane[]> => {
  const res = await axiosInstance.get(endpoints.lanes.get_lanes, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`
        }
      : {},
    params: { sport }
  });
  return res.data;
};
