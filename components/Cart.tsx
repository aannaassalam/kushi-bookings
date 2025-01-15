import assets from "@/json/assets";
import { Lane } from "@/typescript/interface/lane.interfaces";
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
  Input,
  Text,
  Textarea,
  VStack
} from "@chakra-ui/react";
import moment from "moment";
import Image from "next/image";
import { IoIosRemoveCircleOutline, IoMdClose } from "react-icons/io";
import { IoBagOutline, IoChatbubblesOutline } from "react-icons/io5";

const LaneCard = ({ lane, price }: { lane: Lane; price: number }) => {
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
        <button className="bg-lightPrimary py-2 px-4 rounded-full text-primary font-medium text-xs ml-auto">
          Available
        </button>
      </div>
      <div className="p-4  flex justify-between items-center">
        <p className="text-xs">
          <span className="text-gray-600 font-semibold">
            {moment(new Date()).format("MMMM D, YYYY")} |
          </span>{" "}
          05:00 PM - 06:00 PM
        </p>
        <p className="text-base text-primary font-bold">${price} USD</p>
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
  const dummylane = {
    _id: "xyz",
    name: "Lane 1",
    about: "With 1 bowling machine",
    sport: "cricket",
    createdAt: "something",
    updatedAt: "something",
    __v: 123456
  };
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
        <DrawerBody className="!p-8 flex flex-col ">
          <HStack alignItems="center">
            <IoBagOutline size={25} color="#2C8EE3" />
            <p className="text-xl font-semibold text-primaryText ml-1">
              Your Cart (1 items)
            </p>
            <IoIosRemoveCircleOutline
              className="ml-auto cursor-pointer"
              size={25}
            />
          </HStack>
          <VStack gap={4} className="mt-6 mb-4">
            <LaneCard lane={dummylane} price={250} />
            <LaneCard lane={dummylane} price={250} />
            <LaneCard lane={dummylane} price={250} />
          </VStack>

          <HStack className="mt-auto">
            <p className="uppercase text-3xl text-primaryText font-extralight">
              Your total amount
            </p>
            <p className="text-primaryText font-bold text-3xl ml-4">$35 USD</p>
          </HStack>
          <p className="text-primaryText mt-4">
            Taxes and promo codes applied at checkout
          </p>
          <HStack className="mt-4" justifyContent="space-between">
            <Button className="!bg-primary !text-white mr-3 font-semibold !py-6 w-[48%] !rounded-none">
              Purchase
            </Button>
            <Button className="!text-primaryText !bg-white font-semibold !py-6 px-5 border !rounded-none border-black  w-[48%]">
              Continue
            </Button>
          </HStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
