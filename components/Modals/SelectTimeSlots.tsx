import { cx } from "@/lib/utils";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  VStack
} from "@chakra-ui/react";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export const SelectTimeSlots = ({
  open,
  onClose,
  selectedTime,
  setSelectedTime
}: {
  open: boolean;
  onClose: () => void;
  selectedTime: string | null;
  setSelectedTime: (sport: string) => void;
}) => {
  const dummyTimes = [
    "07:00 AM - 08:00AM",
    "08:00 AM - 09:00AM",
    "09:00 AM - 10:00AM",
    "10:00 AM - 11:00AM",
    "11:00 AM - 12:00AM",
    "12:00 AM - 01:00AM",
    "01:00 AM - 02:00AM"
  ];
  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth={600}>
        <ModalHeader flexDirection="row" display="flex" alignItems="center">
          <Box
            onClick={onClose}
            className="bg-[#03A9F4] p-3 mr-4 flex justify-center items-center rounded-xl h-full cursor-pointer w-max"
          >
            <IoMdClose color="#fff" size={20} className="" />
          </Box>
          <Box alignItems="flex-start">
            <p>Slots</p>
            <p className="text-[#858995] text-sm">Select Slots</p>
          </Box>
        </ModalHeader>
        <ModalBody pb="4">
          <Box className="grid grid-cols-3 gap-3">
            {dummyTimes.map((time: string, id) => (
              <Box
                key={id}
                onClick={() => setSelectedTime(time)}
                className={cx(
                  "w-full p-2 py-3 capitalize bg-gray-100 font-light flex justify-center rounded-full cursor-pointer",
                  {
                    "bg-primary": selectedTime === time,
                    "text-white": selectedTime === time
                  }
                )}
              >
                {time}
              </Box>
            ))}
          </Box>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button
            className="bg-primary !px-8 !py-4 text-white font-medium mr-auto h-max"
            colorScheme="primary"
            onClick={onClose}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
