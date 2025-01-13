"use client";

import { createSubscription } from "@/api/functions/payments.api";
import {
  CardElement,
  PaymentElement,
  Elements,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
import { toast } from "sonner";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function PaymentModal(props: {
  is_subscription?: boolean;
  price_id?: string;
  user_id?: string;
  membership_id?: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { isOpen, onClose, ...rest } = props;
  const [payment_details, setPaymentDetails] = useState<{
    client_secret: string;
  }>();

  useEffect(() => {
    if (isOpen) {
      createSubscription({
        price_id: props.price_id!,
        user_id: props.user_id!,
        membership_id: props.membership_id!
      })
        .then((res) => setPaymentDetails(res))
        .catch((err) => console.log(err));
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Payments</ModalHeader>
        <ModalBody>
          {payment_details ? (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret: payment_details?.client_secret }}
            >
              <PaymentForm
                {...rest}
                clientSecret={payment_details?.client_secret}
                onClose={onClose}
              />
            </Elements>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

const PaymentForm = ({
  is_subscription,
  clientSecret,
  onClose
}: {
  is_subscription?: boolean;
  clientSecret?: string;
  onClose: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const cardElement = elements?.getElement(PaymentElement);

    try {
      if (!stripe || !elements) return null;
      setIsLoading(true);
      const { error: submitError } = await elements.submit();
      if (submitError) {
        console.log(submitError);
        toast(submitError.message);
        setIsLoading(false);
        return;
      }
      //   const { client_secret, subscription_id } = payment_details!;

      const { error } = await stripe?.confirmPayment({
        clientSecret: clientSecret!,
        elements: elements,
        confirmParams: {
          return_url: "http://localhost:3000/payment-success"
        }
        // payment_method: { payment_method:cardElement, }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <PaymentElement
        options={{
          layout: "accordion",
          business: { name: "Kushi Bookings" }
        }}
      />
      <Box className="flex justify-end mt-10 gap-4">
        <Button
          variant="ghost"
          //   colorScheme="blue"
          //   isLoading={isLoading}
          //   type="submit"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          variant="solid"
          colorScheme="blue"
          isLoading={isLoading}
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};
