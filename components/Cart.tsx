import { removePendingBookings } from "@/api/functions/payments.api";
import assets from "@/json/assets";
import { CartType, useCartContext } from "@/pages/_app";
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import Image from "next/image";
import { useMemo } from "react";
import { IoIosRemoveCircleOutline, IoMdClose } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import PaymentModal from "./PaymentForm/PaymentForm";

const LaneCard = ({
  lane,
  date
}: {
  lane: CartType["lanes"][0];
  date: string;
}) => {
  const { cart, setCart } = useCartContext();

  const removeItemFromCart = () => {
    const lanes =
      cart?.lanes.filter((_lane) => _lane.lane_id !== lane.lane_id) ?? [];
    setCart((prev) => ({ lanes, date, sport: prev!.sport }));
  };

  return (
    <div className="rounded-xl border border-gray-200 w-full">
      <div className="flex p-2 items-center border-b border-b-gray-200">
        <Image
          src={assets.lane}
          width={50}
          height={50}
          alt=""
          className="w-[50px] h-[50px]"
        />
        <div className="ml-4">
          <p className="text-black font-semibold">{lane.name}</p>
          <p className="text-gray-600 text-xs">{lane.about}</p>
        </div>
        <button
          className="bg-red-200/40 hover:bg-red-100 transition-all py-2 px-4 rounded-full text-red-500 font-medium text-xs ml-auto"
          onClick={removeItemFromCart}
        >
          Remove
        </button>
      </div>
      <div className="p-4  flex justify-between items-center gap-2">
        <div className="text-xs">
          <p className="text-gray-600 font-semibold">
            {moment(date).format("MMMM D, YYYY")}
          </p>
          <div className="flex flex-wrap mt-1">
            {lane.slots.map((_slot) => (
              <>
                <span key={_slot} className="mr-1.5 mb-0.5">
                  {`${moment(_slot, "HH:mm").format("hh:mm A")} - ${moment(
                    _slot,
                    "HH:mm"
                  )
                    .add(1, "hour")
                    .format("hh:mm A")}`}
                </span>
                <span className="mr-1.5">|</span>
              </>
            ))}
          </div>
        </div>
        <p className="text-base text-primary font-bold whitespace-nowrap">
          ${lane.price} USD
        </p>
      </div>
    </div>
  );
};

export default function Cart({
  open = true,
  close
}: {
  open: boolean;
  close: () => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart, setCart } = useCartContext();

  const price = useMemo(
    () => cart?.lanes.reduce((prev, current) => prev + current.price, 0),
    [cart?.lanes]
  );

  const { mutate } = useMutation({
    mutationFn: removePendingBookings
  });

  return (
    <Drawer isOpen={open} placement="right" onClose={close} size="lg">
      <DrawerOverlay />
      <DrawerContent className="rounded-tl-xl rounded-bl-xl">
        {/* <DrawerCloseButton /> */}
        <DrawerHeader className="!p-4">
          <HStack alignItems="center">
            <Box
              onClick={() => {
                close();
              }}
              className="bg-lightPrimary  p-3 mr-4 flex justify-center items-center rounded-xl h-full cursor-pointer"
            >
              <IoMdClose color="#2C8EE3" size={20} className="" />
            </Box>
            <Text fontSize="3xl" fontWeight="bold" color="blue.900" mb={0}>
              Cart
            </Text>
          </HStack>
        </DrawerHeader>
        <Divider />
        <DrawerBody className="!p-8 flex flex-col">
          <HStack alignItems="center">
            <IoBagOutline size={25} color="#2C8EE3" />
            <p className="text-xl font-semibold text-primaryText ml-1">
              Your Cart ({cart?.lanes.length ?? 0} items)
            </p>
            <IconButton
              variant="ghost"
              onClick={() => setCart(undefined)}
              aria-label=""
              className="ml-auto"
            >
              <IoIosRemoveCircleOutline className="" size={25} />
            </IconButton>
          </HStack>
          <VStack gap={4} className="mt-6 mb-4 flex-1">
            {cart?.lanes.map((_lane) => {
              return (
                <LaneCard lane={_lane} key={_lane.lane_id} date={cart.date} />
              );
            })}
          </VStack>

          <HStack className="mt-auto">
            <p className="uppercase text-3xl text-primaryText font-extralight">
              Your total amount
            </p>
            <p className="text-primaryText font-bold text-3xl ml-4">
              ${price ?? 0} USD
            </p>
          </HStack>
          {/* <p className="text-primaryText mt-4">
            Taxes and promo codes applied at checkout
          </p> */}
        </DrawerBody>
        <DrawerFooter className="!px-8 gap-3">
          <Button
            className="!bg-primary !text-white font-semibold !py-6 flex-1 !rounded-none"
            onClick={onOpen}
            disabled={!Boolean(cart)}
          >
            Purchase
          </Button>
          <Button
            className="!text-primaryText !bg-white font-semibold !py-6 px-5 border !rounded-none border-black  flex-1"
            disabled={!Boolean(cart)}
          >
            Continue
          </Button>
        </DrawerFooter>
      </DrawerContent>
      {cart ? (
        <PaymentModal
          isOpen={isOpen}
          onClose={(success?: boolean) => {
            if (success) {
              setCart(undefined);
              close();
            } else {
              mutate();
            }
            onClose();
          }}
          type="booking"
          date={cart!.date}
          lanes={
            cart?.lanes.map((_lane) => ({
              lane_id: _lane.lane_id!,
              price: _lane.price!,
              slots: _lane.slots!
            })) ?? []
          }
          price={price || 0}
          sport={cart!.sport}
        />
      ) : null}
    </Drawer>
  );
}
