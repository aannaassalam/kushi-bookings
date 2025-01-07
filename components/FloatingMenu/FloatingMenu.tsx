import { getFacility } from "@/api/functions/facility.api";
import { cx } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useMemo } from "react";

export default function FloatingMenu({ noButton }: { noButton?: boolean }) {
  const { data, isLoading } = useQuery({
    queryKey: ["facility"],
    queryFn: getFacility
  });

  const { start_time, end_time } = useMemo(() => {
    const day_of_week = moment().format("dddd");
    const day = data?.days.find((_day) => _day.day === day_of_week);
    return isLoading ? { start_time: "", end_time: "" } : day!.timings;
  }, [data, isLoading]);

  const getSlots = () => {
    const _start_time = moment(start_time, "HH:mm");
    const _end_time = moment(end_time, "HH:mm");
    const number_of_slots = _end_time.diff(_start_time, "hours").toFixed();

    const slots = Array.from({ length: parseInt(number_of_slots) }, (_, id) => {
      const availability_checker_time_string = _start_time
        .clone()
        .add(id, "hours")
        .format("HH:mm");
      const slot_start_time = _start_time
        .clone()
        .add(id, "hours")
        .format("hh:mm a");
      const slot_end_time = _start_time
        .clone()
        .add(id + 1, "hours")
        .format("hh:mm a");
      return {
        time: `${slot_start_time} - ${slot_end_time}`,
        available: true,
        availability_checker_time_string
      };
    });
    return slots;
  };

  console.log(getSlots());

  return (
    <div className="absolute left-0 -bottom-[44px] px-[100px] flex items-center justify-center w-full ">
      <div
        className={cx(
          "w-full bg-white grid rounded-lg shadow-[0px_50px_41px_-50px_#7BB933]",
          {
            "grid-cols-4": !noButton,
            "grid-cols-3": noButton
          }
        )}
      >
        <div className="w-full p-6 border-r border-r-gray-300">
          <p className="font-semibold text-lg">Sports</p>
          <p className="text-base">Cricket</p>
        </div>
        <div className="w-full p-6 border-r border-r-gray-300">
          <p className="font-semibold text-lg">Date</p>
          <p className="text-base">November 24, 2024</p>
        </div>
        <div className="w-full p-6 border-r border-r-gray-300">
          <p className="font-semibold text-lg">Time Slot</p>
          <p className="text-base">Select Time Slot</p>
        </div>
        {!noButton && (
          <div className="w-full p-6 ">
            <button className="primaryButton mr-3 font-semibold !py-4 w-full">
              Check Availability
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
