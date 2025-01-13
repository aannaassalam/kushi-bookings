import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const createSubscription = async (body: {
  // payment_method: PaymentMethodData;
  price_id: string;
  // email: string;
  user_id: string;
  membership_id: string;
}) => {
  const res = await axiosInstance.post(
    endpoints.payments.create_subscription,
    body
  );
  return res.data;
};
