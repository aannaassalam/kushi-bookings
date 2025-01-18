import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export type BookingFilter = {
  [key: string]: string[];
};

export const getBookingsForFilter = async (body: {
  date: string;
  sport: string;
  slots: string[];
}) => {
  const res = await axiosInstance.get(
    endpoints.bookings.get_bookings_for_filter,
    {
      params: body
    }
  );
  return res.data;
};
