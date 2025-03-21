import { cx } from "@/lib/utils";
import { useCartContext } from "@/pages/_app";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
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
}: // bookings
// lanes_length
{
  open: boolean;
  onClose: () => void;
  slots: Slot[];
  // bookings: BookingFilter;
  // lanes_length: number;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const time_slots =
    searchParams.getAll("time_slots").length > 0
      ? searchParams.getAll("time_slots")
      : ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
  // const date = searchParams.getAll("date") ?? moment().toISOString();
  const { setCart } = useCartContext();

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
          <Box className="grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
            {slots.map((slot: Slot) => {
              return (
                <Box
                  key={slot.label}
                  onClick={() =>
                    slot.available
                      ? setSelectedTime((_slots) =>
                          _slots.includes(slot.value)
                            ? _slots.filter((_slot) => _slot !== slot.value)
                            : [..._slots, slot.value]
                        )
                      : null
                  }
                  className={cx(
                    "w-full p-4 py-3 capitalize bg-gray-100 font-light flex justify-center rounded-full cursor-pointer",
                    {
                      "bg-primary": selectedTime.includes(slot.value),
                      "text-white": selectedTime.includes(slot.value),
                      "bg-gray-300 !text-gray-800 cursor-not-allowed":
                        !slot.available
                    }
                  )}
                >
                  {slot.label}
                </Box>
              );
            })}
          </Box>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button
            className="bg-primary !px-8 !py-4 text-white font-medium mr-auto h-max"
            colorScheme="primary"
            onClick={() => {
              setCart(undefined);
              const newParams = new URLSearchParams(searchParams.toString());
              newParams.delete("time_slots");
              selectedTime.forEach((_slot) => {
                newParams.append("time_slots", _slot);
              });
              router.push(`${pathname}?${newParams.toString()}`, undefined, {
                shallow: true
              });
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
