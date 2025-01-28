import { cx } from "@/lib/utils";
import { Booking } from "@/typescript/interface/bookings.interface";
import { Lane } from "@/typescript/interface/lane.interfaces";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import BookingDetails from "./BookingDetails";

export default function BookingsGrid({
  bookings,
  lanes
}: {
  bookings: Booking[];
  lanes: Lane[];
}) {
  const searchParams = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState<Booking>();
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
    return Array.from({ length: 7 }, (_, id) => {
      return moment(start_date).startOf("week").add(id, "day");
    });
  }, [start_date]);

  const colors = [
    "bg-[#005A9C]",
    "bg-[#007791]",
    "bg-[#007FFF]",
    "bg-[#4B9CD3]"
  ];

  return (
    <Box w="full" mt={8} className="shadow-custom">
      <Grid
        templateColumns="1fr 7fr"
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
            templateColumns="repeat(7, 1fr)"
            borderBottom="1px solid"
            borderColor="gray.300"
            h="60px"
          >
            {weekdays.map((day, id) => {
              return (
                <Box
                  key={day.unix()}
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
                  <Text>{day.format("ddd")}</Text>
                  <Text className="text-xs mt-1">
                    {day.format("DD-MM-YYYY")}
                  </Text>
                </Box>
              );
            })}
          </Grid>
          {/* Time Rows */}
          <Grid templateRows={`repeat(${timings.length},1fr)`}>
            {timings.map((time, rowIndex) => {
              const comparison_time = moment(time, "hh:mm A").format("HH:mm");
              return (
                <Grid templateColumns="repeat(7, 1fr)" key={rowIndex}>
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
                            console.log(
                              booking_for_day,
                              day.format("DD/MM/YYYY"),
                              time
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
                                      className={`p-2 h-full ${colors[id]} border cursor-pointer rounded-md`}
                                      key={_booking._id}
                                      onClick={() =>
                                        setBookingDetails(_booking)
                                      }
                                    >
                                      <p className="text-sm text-white font-semibold">
                                        {_booking?.user.full_name}
                                      </p>
                                      <p className="text-xs text-white mt-1.5">
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
    </Box>
  );
}
