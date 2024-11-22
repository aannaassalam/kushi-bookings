import React from "react";

export default function FloatingMenu() {
  return (
    <div className="absolute left-0 -bottom-[44px] px-[100px] flex items-center justify-center w-full ">
      <div className="w-full bg-white grid grid-cols-5 rounded-lg shadow-[0px_50px_41px_-50px_#7BB933]">
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
        <div className="w-full p-6 ">
          <button className="primaryButton mr-3 font-semibold !py-4 w-full">
            Check Availibility
          </button>
        </div>
      </div>
    </div>
  );
}
