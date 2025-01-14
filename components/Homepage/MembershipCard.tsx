import {
  CurrentMembership,
  Membership
} from "@/typescript/interface/membership.interfaces";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import PaymentModal from "../PaymentForm/PaymentForm";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { cx } from "@/lib/utils";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { changeSubscription } from "@/api/functions/payments.api";
import { queryClient } from "@/pages/_app";

export default function MembershipCard({
  _id,
  name,
  price,
  about,
  type,
  facility_price,
  stripe_price_id,
  number_of_free_slots_per_week,
  recurring_type,
  isCurrentPlan,
  isUpdatePlan,
  active_plan
}: Membership & {
  isCurrentPlan: boolean;
  isUpdatePlan: boolean;
  active_plan: CurrentMembership | null;
}) {
  const router = useRouter();
  const cookies = parseCookies();
  const user = !!cookies.user && JSON.parse(cookies.user);
  const [modal, setModal] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { mutate, isPending } = useMutation({
    mutationFn: changeSubscription,
    onSuccess: () => {
      onClose();
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["current_membership"] });
      }, 500);
    }
  });

  return (
    <div className="bg-[#F5F7F2] p-5 rounded-md flex flex-col">
      <h2 className="text-[24px] font-bold text-primaryText">{name}</h2>
      <div className="mt-5 mb-auto">
        {about.split("_").map((key_point: string) => {
          return (
            <p
              className="text-primaryText flex flex-row items-center text-xs mb-4"
              key={key_point}
            >
              <FaCheck className="mr-4" size={20} />
              <span className="flex-1">{key_point}</span>
            </p>
          );
        })}
      </div>
      {type === "price_based" ? (
        <p className="text-black py-2 px-4 text-xs rounded-3xl bg-gray-200 w-max mt-8">
          Price For Members{" "}
          <span className="font-semibold">${facility_price}</span>
        </p>
      ) : (
        <p className="text-black py-2 px-4 text-xs rounded-3xl bg-gray-200 w-max mt-8">
          Number of Slots per week{" "}
          <span className="font-semibold">{number_of_free_slots_per_week}</span>
        </p>
      )}
      <div className="flex flex-row items-end my-4">
        <span className="text-lg text-primaryText">$</span>
        <span className="text-2xl text-primaryText font-bold mx-1">
          {price}
        </span>
        <span className="text-base text-gray-600 self-start capitalize">
          {recurring_type}
        </span>
      </div>
      <button
        className={cx(
          "text-primary py-3 w-full font-semibold bg-lightPrimary rounded-md",
          {
            "!bg-primary !text-white !cursor-not-allowed": isCurrentPlan
          }
        )}
        onClick={() => {
          if (!user) {
            router.push("/auth/login");
          }
          if (isCurrentPlan) {
            return null;
          }
          if (isUpdatePlan) {
            onOpen();
          } else {
            setModal(true);
          }
        }}
      >
        {isCurrentPlan ? "Current Plan" : "Choose"}
      </button>
      <PaymentModal
        price_id={stripe_price_id}
        is_subscription
        package_id={_id}
        price={price}
        isOpen={modal}
        onClose={() => setModal(false)}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Plan</ModalHeader>
          <ModalBody>
            Are you sure you want to change plan?
            <br />
            Changes will take effect from the next billing period...
          </ModalBody>
          <ModalFooter gap={2}>
            <Button variant="ghost" onClick={onClose} size="sm">
              No, Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() =>
                mutate({
                  membership_id: _id,
                  subscription_id: active_plan!.subscription_id
                })
              }
              size="sm"
              isLoading={isPending}
            >
              Yes, Change
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
