import { Facility } from "@/typescript/interface/facility.interfaces";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const getFacility = async (): Promise<Facility> => {
  const res = await axiosInstance.get(endpoints.facility.get_facility);
  return res.data;
};
