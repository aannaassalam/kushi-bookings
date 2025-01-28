import {
  CurrentSeasonPass,
  SeasonPass
} from "@/typescript/interface/season-pass.interfaces";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const getSeasonPasses = async (sport: string): Promise<SeasonPass[]> => {
  const res = await axiosInstance.get(endpoints.season_pass.get_all, {
    params: { sport }
  });
  return res.data;
};

export const getCurrentSeasonPass = async (
  sport: string = "cricket",
  token?: string
): Promise<CurrentSeasonPass[]> => {
  const res = await axiosInstance.get(
    endpoints.purchased_season_pass.current_plan,
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
