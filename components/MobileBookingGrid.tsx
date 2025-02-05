import { cx } from "@/lib/utils";
import { Booking } from "@/typescript/interface/bookings.interface";
import { Lane } from "@/typescript/interface/lane.interfaces";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Text,
  VStack
} from "@chakra-ui/react";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import BookingDetails from "./BookingDetails";
import { SelectDate } from "./Modals/SelectDate";
import { MobileSelectDate } from "./Modals/MobileSelectDate";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function MobileBookingsGrid({
  bookings,
  lanes
}: {
  bookings: Booking[];
  lanes: Lane[];
}) {
  const searchParams = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState<Booking>();
  const [dateModal, setDateModal] = useState(false);

  const start_date =
    searchParams.get("start_date") ?? moment().startOf("week").toISOString();

  const timings = useMemo(() => {
    const number_of_hours = moment()
      .add(1, "day")
      .set({ hour: 0, minute: 0 })
      .diff(moment().set({ hour: 10, minute: 0 }), "hours");
    return Array.from({ length: number_of_hours }, (_, id) => {
      return moment()
        .set({ hour: 10, minute: 0 })
        .add(id, "hours")
        .format("hh:mm A");
    });
  }, []);

  const weekdays = useMemo(() => {
    return Array.from({ length: 1 }, (_, id) => {
      return moment(start_date).startOf("week").add(id, "day");
    });
  }, [start_date]);

  const colors = [
    { bg: "bg-[#f79931]", text: "text-white" },
    { bg: "bg-[#00b0f0]", text: "text-white" },
    { bg: "bg-[#ffff00]", text: "text-gray-600" },
    { bg: "bg-[#47d359]", text: "text-white" }
  ];

  return (
    <Box w="full" mt={8} className="shadow-custom md:hidden">
      <Grid
        templateColumns="3fr 7fr"
        border="1px solid"
        borderColor="gray.300"
        rounded="md"
      >
        {/* Time Column */}
        <GridItem borderRight="1px solid" borderColor="gray.300">
          <Box
            h="60px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderBottom="1px solid"
            borderColor="gray.300"
          >
            <Text>All Day</Text>
          </Box>
          {timings.map((time) => (
            <Box
              key={time}
              h="240px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderBottom="1px solid"
              borderColor="gray.300"
            >
              <Text>{time}</Text>
            </Box>
          ))}
        </GridItem>
        {/* Days Columns */}
        <GridItem>
          {/* Header Row */}
          <Grid
            templateColumns="repeat(1, 1fr)"
            borderBottom="1px solid"
            borderColor="gray.300"
            h="60px"
          >
            {weekdays.map((day, id) => {
              return (
                <Box
                  key={day.unix()}
                  onClick={() => setDateModal(true)}
                  h="60px"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  borderRight={id === 6 ? "none" : "1px solid"}
                  borderColor="gray.300"
                  className={cx({
                    "bg-primary text-white font-semibold":
                      day.format("DD/MM/YYYY") === moment().format("DD/MM/YYYY")
                    // "bg-lightPrimary text-primary": id !== 0,
                  })}
                >
                  <HStack className="w-full px-4">
                    <IconButton
                      aria-label=""
                      className="flex !h-auto !min-w-0 !p-1 rounded-md justify-center items-center !bg-lightPrimary mr-auto cursor-pointer"
                      onClick={() => {}}
                    >
                      <IoIosArrowBack color="#2C8EE3" size={20} />
                    </IconButton>
                    <Box className="">
                      <Text textAlign="center">{day.format("ddd")}</Text>
                      <Text className="text-xs mt-1">
                        {day.format("DD-MM-YYYY")}
                      </Text>
                    </Box>
                    <IconButton
                      aria-label=""
                      className="flex !h-auto !min-w-0 !p-1 rounded-md justify-center items-center !bg-lightPrimary ml-auto cursor-pointer"
                      onClick={() => {}}
                    >
                      <IoIosArrowForward color="#2C8EE3" size={20} />
                    </IconButton>
                  </HStack>
                </Box>
              );
            })}
          </Grid>
          {/* Time Rows */}
          <Grid templateRows={`repeat(${timings.length},1fr)`}>
            {timings.map((time, rowIndex) => {
              const comparison_time = moment(time, "hh:mm A").format("HH:mm");
              return (
                <Grid templateColumns="repeat(1, 1fr)" key={rowIndex}>
                  {weekdays.map((day, colIndex) => {
                    const booking_for_day = bookings.filter(
                      (_booking) =>
                        moment(_booking.date).format("DD/MM/YYYY") ===
                          day.format("DD/MM/YYYY") &&
                        _booking.slots.includes(comparison_time)
                    );

                    return (
                      <Grid templateRows="repeat(4),1fr)" key={colIndex}>
                        {/* lane 1 */}

                        {lanes
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((lane, id) => {
                            const booking = booking_for_day.filter(
                              (_booking) => _booking.lane_id === lane._id
                            );

                            return (
                              <Box
                                h="60px"
                                borderBottom="1px solid"
                                borderRight={
                                  colIndex < 6 ? "1px solid" : "none"
                                }
                                borderColor="gray.300"
                                key={
                                  lane._id +
                                  comparison_time +
                                  day.format("DD/MM/YYYY")
                                }
                              >
                                {booking.map((_booking) => {
                                  return (
                                    <Box
                                      className={`p-2 h-full ${colors[id].bg} border cursor-pointer rounded-md`}
                                      key={_booking._id}
                                      onClick={() =>
                                        setBookingDetails(_booking)
                                      }
                                    >
                                      <p
                                        className={`text-sm ${colors[id].text} font-semibold`}
                                      >
                                        {_booking?.user.full_name}
                                      </p>
                                      <p
                                        className={`text-xs ${colors[id].text} font-medium mt-1.5`}
                                      >
                                        {_booking?.lane.name}
                                      </p>
                                    </Box>
                                  );
                                })}
                              </Box>
                            );
                          })}
                      </Grid>
                    );
                  })}
                </Grid>
              );
            })}
          </Grid>
        </GridItem>
      </Grid>
      <BookingDetails
        booking={bookingDetails}
        close={() => setBookingDetails(undefined)}
      />
      {dateModal && (
        <MobileSelectDate
          open={dateModal}
          onClose={() => setDateModal(false)}
        />
      )}
    </Box>
  );
}
