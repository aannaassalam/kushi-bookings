import { getFacility } from "@/api/functions/facility.api";
import { cx } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { SelectDate } from "../Modals/SelectDate";
import { SelectSport } from "../Modals/SelectSport";
import { SelectTimeSlots } from "../Modals/SelectTimeSlots";

export default function FloatingMenu({
  noButton
}: // bookings
{
  noButton?: boolean;
  // bookings: BookingFilter;
}) {
  const [sportModal, setSportModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get("date") ?? moment().toISOString();
  const time_slots = searchParams.getAll("time_slots");
  const sport = searchParams.get("sport");

  const { data } = useQuery({
    queryKey: ["facility"],
    queryFn: getFacility
  });

  const { start_time, end_time } = useMemo(() => {
    const day_of_week = moment(date).format("dddd");
    const day = data?.days.find((_day) => _day.day === day_of_week);
    return !day ? { start_time: "", end_time: "" } : day.timings;
  }, [data, date]);

  const slots = useMemo(() => {
    const _start_time = moment(start_time, "HH:mm");
    const _end_time = moment(end_time, "HH:mm");
    if (_end_time.isBefore(_start_time)) {
      _end_time.add(1, "day");
    }
    const number_of_slots = _end_time.diff(_start_time, "hours").toFixed();

    const slots = Array.from({ length: parseInt(number_of_slots) }, (_, id) => {
      const availability_checker_time_string = _start_time
        .clone()
        .add(id, "hours")
        .format("HH:mm");
      const slot_start_time = _start_time
        .clone()
        .add(id, "hours")
        .format("hh:mm A");
      const slot_end_time = _start_time
        .clone()
        .add(id + 1, "hours")
        .format("hh:mm A");

      return {
        label: `${slot_start_time} - ${slot_end_time}`,
        available:
          moment().unix() <
          moment(date)
            .add(id, "hours")
            .set({
              minute: 0,
              second: 0,
              millisecond: 0
            })
            .unix()
            ? true
            : false,
        value: availability_checker_time_string
      };
    });
    return slots;
  }, [start_time, end_time, date]);

  return (
    <div className="absolute left-0 -bottom-[44px] px-[100px] flex items-center justify-center w-full overflow-visible z-10">
      <div
        className={cx(
          "w-full bg-white grid rounded-lg shadow-[0px_50px_41px_-50px_#7BB933]",
          {
            "grid-cols-4": !noButton,
            "grid-cols-3": noButton
          }
        )}
      >
        <div
          className="w-full p-6 border-r border-r-gray-300 cursor-pointer"
          onClick={() => setSportModal(true)}
        >
          <p className="font-semibold text-lg">Sports</p>
          <p className="text-base capitalize">{sport || "Cricket"}</p>
        </div>
        <div
          className="w-full p-6 border-r border-r-gray-300 cursor-pointer"
          onClick={() => setDateModal(true)}
        >
          <p className="font-semibold text-lg">Date</p>
          <p className="text-base">{moment(date).format("MMMM D, YYYY")}</p>
        </div>
        <div
          className="w-full p-6 border-r border-r-gray-300 cursor-pointer"
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
          <div className="w-full p-6 ">
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
                  newParams.set("sport", sport || "cricket");
                  newParams.set("date", date);
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
          // bookings={bookings}
          // lanes_length={data.l}
        />
      )}
      {dateModal && (
        <SelectDate open={dateModal} onClose={() => setDateModal(false)} />
      )}
    </div>
  );
}
