import { cx } from "@/lib/utils";
import React from "react";

export default function FloatingMenu({ noButton }: { noButton?: boolean }) {
  return (
    <div className="absolute left-0 -bottom-[44px] px-[100px] flex items-center justify-center w-full ">
      <div
        className={cx(
          "w-full bg-white grid rounded-lg shadow-[0px_50px_41px_-50px_#7BB933]",
          {
            "grid-cols-5": !noButton,
            "grid-cols-4": noButton
          }
        )}
      >
        <div className="w-full p-6 border-r border-r-gray-300">
          <p className="font-semibold text-lg">Sports</p>
          <p className="text-base">Cricket</p>
        </div>
        <div className="w-full p-6 border-r border-r-gray-300">
          <p className="font-semibold text-lg">Facility</p>
          <p className="text-base">Kushi Sports</p>
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
