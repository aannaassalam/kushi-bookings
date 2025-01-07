import { cx } from "@/lib/utils";
import React, { useState } from "react";
import { SelectSport } from "../Modals/SelectSport";
import { SelectTimeSlots } from "../Modals/SelectTimeSlots";
import { SelectDate } from "../Modals/SelectDate";
import { Value } from "@/typescript/interface/common.interface";

export default function FloatingMenu({ noButton }: { noButton?: boolean }) {
  const [sportModal, setSportModal] = useState(false);
  const [selectedSport, setSelectedSport] = useState("badminton");
  const [timeModal, setTimeModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [dateModal, setDateModal] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
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
        <div
          className="w-full p-6 border-r border-r-gray-300 cursor-pointer"
          onClick={() => setSportModal(true)}
        >
          <p className="font-semibold text-lg">Sports</p>
          <p className="text-base capitalize">{selectedSport}</p>
        </div>
        <div
          className="w-full p-6 border-r border-r-gray-300 cursor-pointer"
          onClick={() => setDateModal(true)}
        >
          <p className="font-semibold text-lg">Date</p>
          <p className="text-base">November 24, 2024</p>
        </div>
        <div
          className="w-full p-6 border-r border-r-gray-300 cursor-pointer"
          onClick={() => setTimeModal(true)}
        >
          <p className="font-semibold text-lg">Time Slot</p>
          <p className="text-base">
            {selectedTime ? selectedTime : "Select Time Slot"}
          </p>
        </div>
        {!noButton && (
          <div className="w-full p-6 ">
            <button className="primaryButton mr-3 font-semibold !py-4 w-full">
              Check Availability
            </button>
          </div>
        )}
      </div>
      {sportModal && (
        <SelectSport
          open={sportModal}
          onClose={() => setSportModal(false)}
          selectedSport={selectedSport}
          setSelectedSport={setSelectedSport}
        />
      )}
      {timeModal && (
        <SelectTimeSlots
          open={timeModal}
          onClose={() => setTimeModal(false)}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      )}
      {dateModal && (
        <SelectDate
          open={dateModal}
          onClose={() => setDateModal(false)}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
    </div>
  );
}
