"use client";

import {
  createSubscription,
  getPurchaseClientSecret
} from "@/api/functions/payments.api";
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
import { queryClient } from "@/pages/_app";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function PaymentModal(props: {
  is_subscription?: boolean;
  price_id?: string;
  package_id?: string;
  package_type?: "season_pass" | "booking";
  isOpen: boolean;
  price: number;
  onClose: () => void;
}) {
  const { isOpen, onClose, ...rest } = props;
  const [payment_details, setPaymentDetails] = useState<{
    client_secret: string;
  }>();

  useEffect(() => {
    if (!props.is_subscription) {
      getPurchaseClientSecret({
        price: props.price,
        type: props.package_type,
        season_pass_id: props.package_id
      })
        .then((data) => setPaymentDetails(data))
        .catch((err) => console.log(err));
    }
  }, [
    props.is_subscription,
    props.package_id,
    props.price,
    props.price_id,
    props.package_type
  ]);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Payments</ModalHeader>
        <ModalBody>
          {/* {payment_details ? ( */}
          <Elements
            stripe={stripePromise}
            options={
              props.is_subscription
                ? {
                    mode: props.is_subscription ? "subscription" : "payment",
                    paymentMethodCreation: "manual",
                    currency: "usd",
                    amount: props.price * 100
                  }
                : {
                    clientSecret: payment_details?.client_secret
                  }
            }
          >
            <PaymentForm {...rest} onClose={onClose} />
          </Elements>
          {/* ) : null} */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

const PaymentForm = ({
  is_subscription,
  clientSecret,
  onClose,
  price_id,
  package_id,
  package_type
}: {
  is_subscription?: boolean;
  clientSecret?: string;
  onClose: () => void;
  price_id?: string;
  package_id?: string;
  package_type?: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const purchaseItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`
          // return_url: `https://www.google.com`,
        },
        redirect: "if_required"
      });
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["current_season_pass"] });
      }, 500);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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

      const { error: method_error, paymentMethod } =
        await stripe.createPaymentMethod({
          elements
        });

      if (method_error) {
        console.error("Error creating payment method:", method_error);
        alert("Failed to create payment method.");
        return;
      }

      const payment_details = await createSubscription({
        price_id: price_id!,
        package_id: package_id!,
        payment_method: paymentMethod.id!
      });
      //   const { client_secret, subscription_id } = payment_details!;

      const { error } = await stripe?.confirmPayment({
        clientSecret: payment_details.client_secret,
        elements: elements,
        confirmParams: {
          return_url: "http://localhost:3000/payment-success"
        },
        redirect: "if_required"
        // payment_method: { payment_method:cardElement, }
      });
      queryClient.invalidateQueries({ queryKey: ["current_membership"] });
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={is_subscription ? onSubmit : purchaseItem}>
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
