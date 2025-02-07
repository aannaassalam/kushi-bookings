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
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import Calendar from "react-calendar";
import { Value } from "react-calendar/dist/esm/shared/types.js";
import { IoMdClose } from "react-icons/io";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";

// import "react-calendar/dist/Calendar.css";
export const MobileSelectDate = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  // const start_date =
  //   searchParams.get("start_date") ?? moment().startOf("week").toISOString();
  // const end_date =
  //   searchParams.get("end_date") ?? moment().endOf("week").toISOString();
  const [selectedDate, setSelectedDate] = useState<Value>(
    searchParams.has("start_date")
      ? new Date(searchParams.get("start_date")!)
      : new Date()
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
            value={moment(selectedDate?.toString())
              .startOf("day")
              .toISOString()}
            className="text-sm relative"
            calendarType="hebrew"
            formatShortWeekday={(locale, date) =>
              date.toLocaleDateString(locale, { weekday: "narrow" })
            }
            nextLabel={<IoChevronForward size={20} />}
            prevLabel={<IoChevronBackOutline size={20} />}
          />
        </ModalBody>
        <ModalFooter gap={3}>
          <Button
            className="bg-primary !px-8 !py-4 text-white font-medium mr-auto h-max"
            colorScheme="primary"
            onClick={() => {
              const params = new URLSearchParams();
              params.set(
                "start_date",
                moment(selectedDate?.toString()).startOf("week").toISOString()
              );
              params.set(
                "end_date",
                moment(selectedDate?.toString()).endOf("week").toISOString()
              );
              router.push({ search: params.toString() }, undefined, {
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
