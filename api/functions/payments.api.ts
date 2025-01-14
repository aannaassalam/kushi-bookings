import { CurrentMembership } from "@/typescript/interface/membership.interfaces";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

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

export const getPurchaseClientSecret = async (body: {
  price?: number;
  type?: "season_pass" | "booking";
  season_pass_id?: string;
}) => {
  const res = await axiosInstance.post(
    endpoints.payments.generate_payment_intent,
    body
  );
  return res.data;
};
