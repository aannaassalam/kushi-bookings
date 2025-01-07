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
import { isArray } from "lodash";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

interface Slot {
  label: string;
  available: boolean;
  value: string;
}

export const SelectTimeSlots = ({
  open,
  onClose,
  slots
}: {
  open: boolean;
  onClose: () => void;
  slots: Slot[];
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const time_slots = searchParams.getAll("time_slots");
  const [selectedTime, setSelectedTime] = useState<string[]>(time_slots || []);

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth={700}>
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
            {slots.map((slot: Slot) => (
              <Box
                key={slot.label}
                onClick={() =>
                  setSelectedTime((_slots) =>
                    _slots.includes(slot.value)
                      ? _slots.filter((_slot) => _slot !== slot.value)
                      : [..._slots, slot.value]
                  )
                }
                className={cx(
                  "w-full p-4 py-3 capitalize bg-gray-100 font-light flex justify-center rounded-full cursor-pointer",
                  {
                    "bg-primary": selectedTime.includes(slot.value),
                    "text-white": selectedTime.includes(slot.value)
                  }
                )}
              >
                {slot.label}
              </Box>
            ))}
          </Box>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button
            className="bg-primary !px-8 !py-4 text-white font-medium mr-auto h-max"
            colorScheme="primary"
            onClick={() => {
              const newParams = new URLSearchParams(searchParams.toString());
              newParams.delete("time_slots");
              selectedTime.forEach((_slot) => {
                newParams.append("time_slots", _slot);
              });
              router.push(`${pathname}?${newParams.toString()}`);
              onClose();
            }}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
