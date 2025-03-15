import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

interface AdvertiseFormBody {
  full_name: string;
  email: string;
  nature_of_business: string;
}

export const submitAdvertiseForm = async (body: AdvertiseFormBody) => {
  const res = await axiosInstance.post(endpoints.advertise.submit_form, body);
  return res.data;
};
