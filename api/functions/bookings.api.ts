import moment, { Moment } from "moment-timezone";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export type BookingFilter = {
  [key: string]: string[];
};

export const getBookingsForFilter = async (body: {
  date: string;
  sport: string | null;
  number_of_slots?: string;
  start_time?: Moment;
  slots?: string[];
}): Promise<BookingFilter> => {
  let local_slots;
  if (body.number_of_slots && body.start_time) {
    const moment_time = moment(body.start_time);
    local_slots = Array.from(
      { length: parseInt(body.number_of_slots) },
      (_, index) => moment_time.clone().add(index, "hour").format("HH:mm")
    );
  }
  const res = await axiosInstance.get(
    endpoints.bookings.get_bookings_for_filter,
    {
      params: {
        sport: body.sport,
        date: moment
          .utc({
            year: moment(body.date).year(),
            month: moment(body.date).month(),
            day: moment(body.date).date(),
            hour: 0,
            minute: 0,
            second: 0
          })
          .toISOString(),
        slots: local_slots ?? body.slots
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
  const res = await axiosInstance.get(endpoints.bookings.get_my_bookings, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`
        }
      : {},
    params: {
      lane_id: lanes,
      sport,
      start_date: moment
        .utc({
          year: moment(start_date).year(),
          month: moment(start_date).month(),
          day: moment(start_date).date(),
          hour: 0,
          minute: 0,
          second: 0
        })
        .toISOString(),
      end_date: moment
        .utc({
          year: moment(end_date).year(),
          month: moment(end_date).month(),
          day: moment(end_date).date(),
          hour: 0,
          minute: 0,
          second: 0
        })
        .toISOString()
    }
  });

  return res.data;
};
