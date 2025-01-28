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

export const getMyBookings = async ({
  lanes,
  sport,
  start_date,
  end_date,
  token
}: {
  lanes: string[];
  sport: string;
  start_date: string;
  end_date: string;
  token?: string;
}) => {
  const res = await axiosInstance.get(endpoints.bookings.get_my_bookings, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`
        }
      : {},
    params: {
      lane_id: lanes,
      sport,
      start_date,
      end_date
    }
  });

  return res.data;
};
