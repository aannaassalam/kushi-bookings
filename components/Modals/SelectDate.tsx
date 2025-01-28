import { useCartContext } from "@/pages/_app";
import { Value } from "@/typescript/interface/common.interface";
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
import moment from "moment";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import Calendar from "react-calendar";
import { IoMdClose } from "react-icons/io";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";

// import "react-calendar/dist/Calendar.css";
export const SelectDate = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { setCart } = useCartContext();

  const [selectedDate, setSelectedDate] = useState<Value>(
    searchParams.get("date") ? new Date(searchParams.get("date")!) : new Date()
  );

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth={400}>
        <ModalHeader flexDirection="row" display="flex" alignItems="center">
          <Box
            onClick={onClose}
            className="bg-[#03A9F4] p-3 mr-4 flex justify-center items-center rounded-xl h-full cursor-pointer w-max"
          >
            <IoMdClose color="#fff" size={20} className="" />
          </Box>
          <Box alignItems="flex-start">
            <p>Date</p>
            <p className="text-[#858995] text-sm">Select Date</p>
          </Box>
        </ModalHeader>
        <ModalBody pb="4">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            minDate={new Date()}
            className="text-sm relative"
            formatShortWeekday={(locale, date) =>
              date.toLocaleDateString(locale, { weekday: "narrow" })
            }
            calendarType="hebrew"
            nextLabel={<IoChevronForward size={20} />}
            prevLabel={<IoChevronBackOutline size={20} />}
          />
        </ModalBody>
        <ModalFooter gap={3}>
          <Button
            className="bg-primary !px-8 !py-4 text-white font-medium mr-auto h-max"
            colorScheme="primary"
            onClick={() => {
              setCart(undefined);
              const newParams = new URLSearchParams(searchParams.toString());
              newParams.set(
                "date",
                moment(selectedDate?.toString()).toISOString()
              );
              newParams.delete("time_slots");
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
