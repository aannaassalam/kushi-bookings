import { Lane } from "@/typescript/interface/lane.interfaces";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const getLanes = async (body: {
  sport: string | null;
  date: string | null;
  time_slots: string[];
}): Promise<Lane[]> => {
  const res = await axiosInstance.get(endpoints.lanes.get_lanes, {
    params: body
  });
  return res.data;
};
