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

export const SelectSport = ({
  open,
  onClose,
  selectedSport,
  setSelectedSport
}: {
  open: boolean;
  onClose: () => void;
  selectedSport: string;
  setSelectedSport: (sport: string) => void;
}) => {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader flexDirection="row" display="flex" alignItems="center">
          <Box
            onClick={onClose}
            className="bg-[#03A9F4] p-3 mr-4 flex justify-center items-center rounded-xl h-full cursor-pointer w-max"
          >
            <IoMdClose color="#fff" size={20} className="" />
          </Box>
          <Box alignItems="flex-start">
            <p>Sports</p>
            <p className="text-[#858995] text-sm">Select Sport</p>
          </Box>
        </ModalHeader>
        <ModalBody pb="4">
          <Stack gap="4">
            {["badminton", "cricket"].map((sport: string, id) => (
              <Box
                key={id}
                onClick={() => setSelectedSport(sport)}
                className={cx(
                  "w-full p-2 capitalize bg-gray-200 flex justify-center rounded-full cursor-pointer",
                  {
                    "bg-primary": selectedSport === sport,
                    "text-white": selectedSport === sport
                  }
                )}
              >
                {sport}
              </Box>
            ))}
          </Stack>
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
