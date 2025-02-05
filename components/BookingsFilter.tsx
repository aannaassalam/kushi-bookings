import { cx } from "@/lib/utils";
import { Box, HStack, IconButton } from "@chakra-ui/react";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsCalendar3 } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward, IoMdAdd } from "react-icons/io";
import { BookingSelectDate } from "./Modals/BookingSelectDate";
import { SelectLane } from "./Modals/SelectLane";
import { SelectSport } from "./Modals/SelectSport";

function BookingsFilter() {
  const router = useRouter();
  const [sportModal, setSportModal] = useState(false);
  const [laneModal, setLaneModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const searchParams = useSearchParams();
  const start_date =
    searchParams.get("start_date") ?? moment().startOf("week").toISOString();
  const end_date =
    searchParams.get("end_date") ?? moment().endOf("week").toISOString();
  const lanes = searchParams.getAll("lane");
  const sport = searchParams.get("sport") ?? "cricket";

  return (
    <div
      className={cx(
        "w-full bg-white grid grid-cols-5 rounded-lg shadow-custom mt-8 border border-gray-200 max-md:hidden"
      )}
    >
      <HStack className="p-3 border-r border-r-gray-200 min-w-[200px] col-span-3 max-lg:col-span-5 max-lg:border-b max-lg:border-b-gray-300">
        <Box>
          <p className="text-gray-700 font-semibold">Date</p>
          <p className="text-gray-700">
            {moment(start_date).format("MMMM D, YYYY")} -{" "}
            {moment(end_date).format("MMMM D, YYYY")}
          </p>
        </Box>
        <IconButton
          aria-label=""
          className="flex !h-auto !min-w-0 !p-1.5 rounded-md justify-center items-center !bg-lightPrimary ml-auto cursor-pointer"
          onClick={() => setDateModal(true)}
        >
          <BsCalendar3 color="#2C8EE3" size={16} />
        </IconButton>
        <IconButton
          aria-label=""
          className="flex !h-auto !min-w-0 !p-1 rounded-md justify-center items-center !bg-lightPrimary ml-2 cursor-pointer"
          onClick={() => {
            const params = new URLSearchParams();
            params.set(
              "start_date",
              moment(start_date).subtract(1, "week").toISOString()
            );
            params.set(
              "end_date",
              moment(end_date).subtract(1, "week").toISOString()
            );
            router.push({ search: params.toString() }, undefined, {
              shallow: true
            });
          }}
        >
          <IoIosArrowBack color="#2C8EE3" size={20} />
        </IconButton>
        <IconButton
          aria-label=""
          className="flex !h-auto !min-w-0 !p-1 rounded-md justify-center items-center !bg-lightPrimary ml-2 cursor-pointer"
          onClick={() => {
            const params = new URLSearchParams();
            params.set(
              "start_date",
              moment(start_date).add(1, "week").toISOString()
            );
            params.set(
              "end_date",
              moment(end_date).add(1, "week").toISOString()
            );
            router.push({ search: params.toString() }, undefined, {
              shallow: true
            });
          }}
        >
          <IoIosArrowForward color="#2C8EE3" size={20} />
        </IconButton>
      </HStack>
      <HStack
        className="p-3 border-r border-r-gray-200 min-w-[200px] cursor-pointer max-lg:col-start-1 "
        onClick={() => setSportModal(true)}
      >
        <Box>
          <p className="text-gray-700 font-semibold">Sport</p>
          <p className="text-gray-700 capitalize">{sport || "Select Sport"}</p>
        </Box>
        <Box className="flex p-1 rounded-md justify-center items-center bg-lightPrimary ml-auto">
          <IoMdAdd color="#2C8EE3" size={20} />
        </Box>
      </HStack>
      <HStack
        className="p-3 border-r border-r-gray-200 min-w-[200px] cursor-pointer max-lg:ml-[40px]"
        onClick={() => setLaneModal(true)}
      >
        <Box>
          <p className="text-gray-700 font-semibold">Lane</p>
          <p className="text-gray-700">
            {lanes?.length ? `${lanes.length} selected` : "Select Lane"}
          </p>
        </Box>
        <Box className="flex p-1 rounded-md justify-center items-center bg-lightPrimary ml-auto">
          <IoMdAdd color="#2C8EE3" size={20} />
        </Box>
      </HStack>

      {sportModal && (
        <SelectSport open={sportModal} onClose={() => setSportModal(false)} />
      )}
      {laneModal && (
        <SelectLane open={laneModal} onClose={() => setLaneModal(false)} />
      )}
      {/* {memberModal && (
        <SelectMember
          open={memberModal}
          onClose={() => setMemberModal(false)}
        />
      )} */}
      {dateModal && (
        <BookingSelectDate
          open={dateModal}
          onClose={() => setDateModal(false)}
        />
      )}
    </div>
  );
}

export default BookingsFilter;
