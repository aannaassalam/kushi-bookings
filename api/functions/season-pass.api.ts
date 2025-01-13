import { SeasonPass } from "@/typescript/interface/season-pass.interfaces";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const getSeasonPasses = async (sport: string): Promise<SeasonPass[]> => {
  const res = await axiosInstance.get(endpoints.season_pass.get_all, {
    params: { sport }
  });
  return res.data;
};
