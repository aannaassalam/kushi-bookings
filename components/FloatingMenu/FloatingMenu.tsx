import { getFacility } from "@/api/functions/facility.api";
import { cx } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { SelectDate } from "../Modals/SelectDate";
import { SelectSport } from "../Modals/SelectSport";
import { SelectTimeSlots } from "../Modals/SelectTimeSlots";
import { getLanes } from "@/api/functions/lane.api";
import { getBookingsForFilter } from "@/api/functions/bookings.api";

export default function FloatingMenu({
  noButton
}: // bookings
{
  noButton?: boolean;
  // bookings: BookingFilter;
}) {
  const first_run = useRef(true);
  const [sportModal, setSportModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const date = searchParams.get("date") ?? moment().toISOString();
  const time_slots = searchParams.getAll("time_slots");
  // const sport = searchParams.get("sport") ?? "cricket";
  const fallback_date = useMemo(() => moment().toISOString(), []);
  const { date = fallback_date, sport = "cricket" } = router.query;

  const { data } = useQuery({
    queryKey: ["facility"],
    queryFn: getFacility
  });

  const { start_time, end_time } = useMemo(() => {
    const day_of_week = moment(date).format("dddd");
    const day = data?.days.find((_day) => _day.day === day_of_week);
    return !day ? { start_time: "", end_time: "" } : day.timings;
  }, [data, date]);

  useEffect(() => {
    if (first_run) {
      first_run.current = false;
    } else {
      router.replace({
        pathname,
        query: {
          date,
          sport
        }
      });
    }
  }, [moment().format("HH")]);

  const { start_time: parsed_start_time, number_of_slots } = useMemo(() => {
    const _start_time = moment(start_time, "HH:mm");
    const _end_time = moment(end_time, "HH:mm");
    if (_end_time.isBefore(_start_time)) {
      _end_time.add(1, "day");
    }
    const number_of_slots = _end_time.diff(_start_time, "hours").toFixed();
    return { start_time: _start_time, number_of_slots };
  }, [start_time, end_time]);

  const { data: bookings, isFetching } = useQuery({
    queryKey: [
      "bookings-filter",
      parsed_start_time,
      number_of_slots,
      date,
      sport
    ],
    queryFn: () =>
      getBookingsForFilter({
        date: date.toString(),
        sport: sport.toString(),
        start_time: parsed_start_time,
        number_of_slots
      })
  });

  const { data: lanes, isFetching: isLanesFetching } = useQuery({
    queryKey: ["lanes", sport],
    queryFn: () => getLanes(sport.toString())
  });

  const slots = useMemo(() => {
    let slots: { label: string; available: boolean; value: string }[] = [];
    if (bookings && lanes) {
      slots = Array.from({ length: parseInt(number_of_slots) }, (_, id) => {
        const availability_checker_time_string = parsed_start_time
          .clone()
          .add(id, "hours")
          .format("HH:mm");
        const slot_start_time = parsed_start_time
          .clone()
          .add(id, "hours")
          .format("hh:mm A");
        const slot_end_time = parsed_start_time
          .clone()
          .add(id + 1, "hours")
          .format("hh:mm A");

        return {
          label: `${slot_start_time} - ${slot_end_time}`,
          available:
            bookings[availability_checker_time_string].length >= lanes.length
              ? false
              : moment().unix() <
                moment(date)
                  .set({ hour: parseInt(parsed_start_time.format("HH")) })
                  .add(id, "hours")
                  .set({
                    minute: 0,
                    second: 0,
                    millisecond: 0
                  })
                  .unix(),
          value: availability_checker_time_string
        };
      });
    }
    return slots;
  }, [parsed_start_time, end_time, date, bookings, lanes]);

  return (
    <div
      className={cx(
        "pr-[100px] flex items-center justify-center w-full overflow-visible z-10 max-lg:-bottom-[290px] max-lg:pr-[40px] max-md:pr-[20px]",
        {
          "max-lg:-bottom-[220px] absolute left-0 -bottom-[44px] px-[100px] max-xl:px-[40px] max-md:px-[20px]":
            noButton
        }
      )}
    >
      <div
        className={cx(
          "w-full bg-white grid rounded-lg shadow-[0px_50px_41px_-50px_#7BB933] max-lg:shadow-none",
          {
            "grid-cols-4 max-lg:grid-cols-2": !noButton,
            "grid-cols-3 max-lg:grid-cols-2": noButton
          }
        )}
      >
        <div
          className="w-full p-6 border-r border-r-gray-300 cursor-pointer max-lg:border-b max-lg:border-b-gray-300"
          onClick={() => setSportModal(true)}
        >
          <p className="font-semibold text-lg">Sports</p>
          <p className="text-base capitalize">{sport || "Cricket"}</p>
        </div>
        <div
          className="w-full p-6 border-r border-r-gray-300 cursor-pointer max-lg:border-r-0 max-lg:border-b max-lg:border-b-gray-300"
          onClick={() => setDateModal(true)}
        >
          <p className="font-semibold text-lg">Date</p>
          <p className="text-base max-xs:text-[15px]">
            {moment(date).format("MMMM DD, YYYY")}
          </p>
        </div>
        <div
          className="w-full p-6 cursor-pointer max-lg:col-start-1 max-lg:col-end-13 max-lg:border-r-0 max-lg:border-b max-lg:border-b-gray-300"
          onClick={() => setTimeModal(true)}
        >
          <p className="font-semibold text-lg">Time Slot</p>
          <p className="text-base">
            {time_slots.length
              ? `${moment(time_slots[0], "HH:mm").format("hh:mm A")} - ${moment(
                  time_slots[0],
                  "HH:mm"
                )
                  .add(1, "hour")
                  .format("hh:mm A")} ${
                  time_slots.length > 1
                    ? ` + ${time_slots.length - 1} more`
                    : ""
                }`
              : "Select Time Slot"}
          </p>
        </div>
        {!noButton && (
          <div className="w-full p-6 border-l border-l-gray-300 max-lg:border-none max-md:m-0 max-lg:col-start-1 max-lg:col-end-13 max-lg:px-0 max-md:pt-0 max-lg:pt-2 max-lg:pb-0">
            <button
              className="primaryButton mr-3 font-semibold !py-4 w-full"
              onClick={() => {
                if (date && time_slots.length) {
                  const newParams = new URLSearchParams(
                    searchParams.toString()
                  );
                  newParams.delete("sport");
                  newParams.delete("date");
                  newParams.delete("time_slots");
                  newParams.set("sport", sport.toString() || "cricket");
                  newParams.set("date", date.toString());
                  time_slots.forEach((_slot) => {
                    newParams.append("time_slots", _slot);
                  });
                  router.push(`/facility?${newParams.toString()}`);
                } else {
                  // router.push("/facility");
                  toast.warning("Please select all filters to search");
                }
              }}
            >
              Check Availability
            </button>
          </div>
        )}
      </div>
      {sportModal && (
        <SelectSport open={sportModal} onClose={() => setSportModal(false)} />
      )}
      {timeModal && (
        <SelectTimeSlots
          slots={slots}
          open={timeModal}
          onClose={() => setTimeModal(false)}
          isLoading={isFetching || isLanesFetching}
        />
      )}
      {dateModal && (
        <SelectDate open={dateModal} onClose={() => setDateModal(false)} />
      )}
    </div>
  );
}
