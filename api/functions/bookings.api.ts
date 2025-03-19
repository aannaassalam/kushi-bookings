import moment from "moment-timezone";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";
import { getTimezone } from "@/lib/functions/_helpers.lib";

export type BookingFilter = {
  [key: string]: string[];
};

export const getBookingsForFilter = async (body: {
  date: string;
  sport: string;
  slots: string[];
}) => {
  const timezone = getTimezone();
  const res = await axiosInstance.get(
    endpoints.bookings.get_bookings_for_filter,
    {
      params: {
        ...body,
        date: moment.tz(body.date, timezone).utc()
      }
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
  const timezone = getTimezone();
  const res = await axiosInstance.get(endpoints.bookings.get_my_bookings, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`
        }
      : {},
    params: {
      lane_id: lanes,
      sport,
      start_date: moment.tz(start_date, timezone).utc(),
      end_date: moment.tz(end_date, timezone).utc()
    }
  });

  return res.data;
};
