import { CurrentMembership } from "@/typescript/interface/membership.interfaces";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";
import {
  BookingMetaData,
  SeasonPassMetaData
} from "@/typescript/interface/payments.interface";
import { getTimezone } from "@/lib/functions/_helpers.lib";
import moment from "moment-timezone";

export const createSubscription = async (body: {
  payment_method: string;
  price_id: string;
  package_id: string;
}) => {
  const res = await axiosInstance.post(
    endpoints.payments.create_subscription,
    body
  );
  return res.data;
};

export const changeSubscription = async (body: {
  subscription_id: string;
  membership_id: string;
}): Promise<CurrentMembership> => {
  const res = await axiosInstance.post(
    endpoints.payments.change_subscription,
    body
  );
  return res.data;
};

export const getPurchaseClientSecret = async (
  body: SeasonPassMetaData | BookingMetaData
) => {
  const res = await axiosInstance.post(
    endpoints.payments.generate_payment_intent,
    {
      ...body,
      date:
        body.type === "booking"
          ? moment.utc(body.date).toISOString()
          : undefined
    }
  );
  return res.data;
};

export const removePendingBookings = async () => {
  const res = await axiosInstance.get(
    endpoints.payments.remove_pending_bookings
  );
  return res.data;
};
