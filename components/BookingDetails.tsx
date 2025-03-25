import { getFacility } from "@/api/functions/facility.api";
import assets from "@/json/assets";
import { cx } from "@/lib/utils";
import { Booking } from "@/typescript/interface/bookings.interface";
import { DaysInterface } from "@/typescript/interface/facility.interfaces";
import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { IoChatbubblesOutline } from "react-icons/io5";

export default function BookingDetails({
  booking,
  close
}: {
  booking?: Booking;
  close: () => void;
}) {
  // const { isOpen, onClose, onOpen } = useDisclosure();
  const [viewNotes, setViewNotes] = useState(false);
  const { data } = useQuery({ queryKey: ["facility"], queryFn: getFacility });

  const actual_price =
    (data?.price?.[moment(booking?.date).format("dddd") as DaysInterface] ??
      0) * (booking?.slots?.length ?? 1);

  return (
    <Drawer
      isOpen={Boolean(booking)}
      placement="right"
      onClose={close}
      size="lg"
    >
      <DrawerOverlay />
      <DrawerContent className="rounded-tl-xl rounded-bl-xl">
        {/* <DrawerCloseButton /> */}
        <DrawerHeader className="!p-4">
          <HStack alignItems="center">
            <Box
              onClick={() => {
                close();
              }}
              className="bg-lightPrimary p-4 mr-4 flex justify-center items-center rounded-xl h-full cursor-pointer"
            >
              <IoMdClose color="#2C8EE3" size={20} className="" />
            </Box>
            <HStack className="ml-0">
              <Image
                alt="user"
                width={36}
                height={36}
                src={booking?.user.profile_photo || assets.default_user}
                className="!w-[45px] !h-[45px] rounded-md"
              />
              <Box>
                <p className="font-inter text-sm font-semibold capitalize">
                  {booking?.user.full_name}
                </p>
                {/* <p className="font-inter !p-0 h-max text-xs text-primary capitalize font-semibold cursor-pointer">
                  User since -{" "}
                  {moment(booking?.user.createdAt).format("MMM DD,YYYY")}
                </p> */}
              </Box>
            </HStack>
          </HStack>
        </DrawerHeader>
        <Divider />

        <DrawerBody className="!p-4 ">
          <Box rounded="lg" className="flex flex-col flex-1">
            <HStack className="w-full bg-gray-50 rounded-lg p-4 ">
              <Box className="mr-4">
                <p className="text-gray-600 text-sm whitespace-nowrap">
                  Phone Number
                </p>
                <p className="text-sm">{booking?.user.phone}</p>
              </Box>
              <Box className="mr-4">
                <p className="text-gray-600 text-sm">Email Address</p>
                <p className="text-sm">{booking?.user.email}</p>
              </Box>
              <Box className="mr-4">
                <p className="text-gray-600 text-sm">Transaction ID</p>
                <p className="text-xs">{booking?.transaction_id}</p>
              </Box>
              <Box
                className={cx(
                  "bg-primary p-4 rounded-md ml-auto cursor-pointer",
                  {
                    "bg-primary/50 cursor-not-allowed": !booking?.note
                  }
                )}
                onClick={() => !!booking?.note && setViewNotes((prev) => !prev)}
              >
                <IoChatbubblesOutline size={20} color="#fff" />
              </Box>
            </HStack>
            <Box
              className={cx("w-full bg-gray-50 rounded-lg p-4 mt-5", {
                hidden: !viewNotes
              })}
            >
              {booking?.note}
            </Box>
            {/* Create Timing Section */}
            <Box mt={6}>
              <Box
                className="bg-primary flex justify-between items-center"
                p={6}
                rounded="lg"
                color="white"
              >
                <Box className="flex-1">
                  <Text fontSize="2xl" fontWeight="bold">
                    {booking?.slots
                      .sort((a, b) => a.localeCompare(b))
                      .map(
                        (slot) =>
                          `${moment(slot, "HH:mm").format(
                            "hh:mm A"
                          )} - ${moment(slot, "HH:mm")
                            .add(1, "hour")
                            .format("hh:mm A")}`
                      )
                      .join(" | ")}
                    <span className="font-light text-whiteAlpha-700 ml-3">
                      {60 * (booking?.slots?.length || 1)} Minutes
                    </span>
                  </Text>
                  <Text fontSize="sm">
                    Booked by <b>{booking?.user.full_name}</b> on{" "}
                    {moment(booking?.createdAt).format("MMM DD, YYYY")}
                  </Text>
                </Box>
                <Box className="bg-[#2B85D3] p-3">
                  <p className="text-lg">
                    {moment(booking?.date).format("dddd MMM DD")}
                  </p>
                </Box>
              </Box>
            </Box>
            <Box className=" mt-4 w-full bg-gray-50 rounded-lg p-4 ">
              <p className="p-4 text-lg rounded-md w-full bg-white mb-4">
                Services & Items
              </p>
              <HStack className="w-full justify-between p-4 py-2 mb-0">
                <Box className="">
                  <p className="text-sm">
                    {booking?.lane.name} ({booking?.lane.about})
                  </p>
                  <p className="text-xs">
                    {60 * (booking?.slots?.length || 1)} Minutes
                  </p>
                </Box>
                <p className="text-sm">${actual_price.toFixed(2)}</p>
              </HStack>
              <HStack className="w-full justify-between p-4 py-2 mb-0">
                <p className="text-sm">Free Slots used</p>
                <p className="text-sm">{booking?.free_slots_used}</p>
              </HStack>
              <HStack className="w-full justify-between p-4 py-2 mb-0">
                <p className="text-sm">Discount</p>
                <p className="text-sm">
                  ${(actual_price - (booking?.price ?? 0)).toFixed(2)}
                </p>
              </HStack>
              {!!booking?.box_booking_price && (
                <HStack className="w-full justify-between p-4 py-2 mb-0">
                  <p className="text-sm">Box Booking Charge</p>
                  <p className="text-sm">
                    ${booking.box_booking_price.toFixed(2)}
                  </p>
                </HStack>
              )}
              <HStack className="w-full justify-between p-4 py-2 mb-0">
                <p className="text-sm">SubTotal</p>
                <p className="text-sm">
                  $
                  {(
                    (booking?.price ?? 0) + (booking?.box_booking_price ?? 0)
                  ).toFixed(2)}
                </p>
              </HStack>
              <Divider />
              <HStack className="w-full justify-between p-4 py-2 mb-0">
                <p className="text-sm">Total</p>
                <p className="text-sm">
                  $
                  {(
                    (booking?.price ?? 0) + (booking?.box_booking_price ?? 0)
                  ).toFixed(2)}
                </p>
              </HStack>
            </Box>
            {!booking?.season_pass_id && booking?.membership && (
              <Box className=" mt-4 w-full bg-gray-50 rounded-lg p-4 ">
                <p className="p-4 text-lg rounded-md w-full bg-white mb-4">
                  Membership
                </p>
                <Link href="/membership" className="text-sm">
                  <HStack className="w-full justify-between p-4 py-2 mb-0">
                    <Box className="">
                      <p className="text-sm">{booking?.membership?.name}</p>
                    </Box>
                    <FaArrowUpRightFromSquare />
                  </HStack>
                </Link>
              </Box>
            )}
            {Boolean(booking?.season_pass_id) && (
              <Box className=" mt-4 w-full bg-gray-50 rounded-lg p-4 ">
                <p className="p-4 text-lg rounded-md w-full bg-white mb-4">
                  Season Pass
                </p>
                <Link href="/season-pass" className="text-sm">
                  <HStack className="w-full justify-between p-4 py-2 mb-0">
                    <Box className="">
                      <p className="text-sm">{booking?.season_pass.name}</p>
                    </Box>
                    <FaArrowUpRightFromSquare />
                  </HStack>
                </Link>
              </Box>
            )}
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
