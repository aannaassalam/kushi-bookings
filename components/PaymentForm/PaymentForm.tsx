"use client";

import {
  createSubscription,
  getPurchaseClientSecret
} from "@/api/functions/payments.api";
import { queryClient } from "@/pages/_app";
import { MetadataType } from "@/typescript/interface/payments.interface";
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner
} from "@chakra-ui/react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { toast } from "sonner";

const stripePromise = loadStripe(process.env.NEXT_APP_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentModal(
  props: MetadataType & {
    isOpen: boolean;
    onClose: (success?: boolean) => void;
  }
) {
  const { isOpen, onClose, ...metadata } = props;
  const [loading, setLoading] = useState(true);
  const [payment_details, setPaymentDetails] = useState<{
    client_secret: string;
  }>();

  useEffect(() => {
    setLoading(true);
    if (metadata.type !== "subscription" && isOpen) {
      getPurchaseClientSecret(metadata)
        .then((data) => {
          if (data.status === 400) {
            toast.error(data.message);
            onClose();
          } else if (data?.client_secret) {
            setPaymentDetails(data);
            setLoading(false);
          } else {
            setPaymentDetails(undefined);
            setTimeout(() => {
              queryClient.invalidateQueries({
                queryKey: ["current_season_pass"]
              });
              queryClient.invalidateQueries({ queryKey: ["bookings"] });
              queryClient.invalidateQueries({
                queryKey: ["current_membership"]
              });
            }, 700);
            toast.success("Payment successful, booking confirmed");
            onClose(true);
          }
        })
        .catch((err) => console.log(err));
    } else if (isOpen) {
      setLoading(false);
    }
  }, [isOpen]);

  console.log(payment_details);

  const renderer = ({ minutes, seconds, completed }: CountdownRenderProps) => {
    if (completed) {
      onClose();
      return <></>;
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="flex items-center justify-between gap-5">
          Payments
          {!loading && (
            <Countdown date={Date.now() + 178999} renderer={renderer} />
          )}
        </ModalHeader>
        <ModalBody>
          {/* {payment_details ? ( */}
          {loading ? (
            <HStack
              className="w-full h-32"
              alignItems="center"
              justifyContent="center"
            >
              <Spinner className="mb-10" />
            </HStack>
          ) : (
            <Elements
              stripe={stripePromise}
              options={
                metadata.type === "subscription"
                  ? {
                      mode: "subscription",
                      paymentMethodCreation: "manual",
                      currency: "usd",
                      amount: props.price * 100
                    }
                  : {
                      clientSecret: payment_details?.client_secret
                    }
              }
            >
              <PaymentForm metadata={metadata} onClose={onClose} />
            </Elements>
          )}
          {/* ) : null} */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

const PaymentForm = ({
  metadata,
  onClose
}: {
  metadata: MetadataType;
  onClose: (success?: boolean) => void;
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
        },
        redirect: "if_required"
      });
      if (error) {
        console.log(error);
        toast.error("Something went wrong");
        return;
      }
      toast.success("Payment successful, Confirmation email sent");
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["current_season_pass"] });
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
        queryClient.invalidateQueries({ queryKey: ["current_membership"] });
      }, 800);
      onClose(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

      let payment_details;
      if (metadata.type === "subscription") {
        payment_details = await createSubscription({
          price_id: metadata.price_id!,
          package_id: metadata.package_id!,
          payment_method: paymentMethod.id!
        });
      }

      const { error } = await stripe?.confirmPayment({
        clientSecret: payment_details.client_secret,
        elements: elements,
        confirmParams: {
          return_url: "http://localhost:3000/payment-success"
        },
        redirect: "if_required"
      });
      if (error) {
        console.log(error);
        toast.error("Something went wrong");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["current_membership"] });
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={metadata?.type === "subscription" ? onSubmit : purchaseItem}
    >
      <PaymentElement
        options={{
          layout: "accordion",
          business: { name: "Kushi Bookings" }
        }}
      />
      <Box className="flex justify-end mt-10 mb-3 gap-2">
        <Button
          variant="ghost"
          //   colorScheme="blue"
          //   isLoading={isLoading}
          //   type="submit"
          onClick={() => onClose()}
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
