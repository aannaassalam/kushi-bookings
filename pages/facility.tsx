import FloatingMenu from "@/components/FloatingMenu/FloatingMenu";
import assets from "@/json/assets";
import AppLayout from "@/layouts/AppLayout";
import Image from "next/image";
import React from "react";
import { IoBagOutline } from "react-icons/io5";
export default function Facility() {
  const LaneCard = () => {
    return (
      <div className="rounded-xl border border-gray-200">
        <div className="flex p-2 items-center border-b border-b-gray-200">
          <Image
            src={assets.lane}
            width={50}
            height={50}
            alt=""
            className="w-[50px] h-[50px]"
          />
          <div className="ml-4">
            <p className="text-black font-semibold">Lane 1</p>
            <p className="text-gray-600 text-xs">
              with Bowling Machine & with feeder option{" "}
            </p>
          </div>
          <p className="text-primary ml-auto mb-auto">
            <IoBagOutline size={20} />
          </p>
        </div>
        <div className="p-4 py-2 flex justify-between items-center">
          <p className="text-xs">
            <span className="text-gray-600 font-semibold">
              November 24, 2024 |
            </span>{" "}
            05:00 PM - 06:00 PM
          </p>
          <button className="bg-[#F5F7F2] py-2 px-4 rounded-full text-primary font-medium text-xs">
            Available
          </button>
        </div>
        <div className="p-4 py-2 flex justify-between items-center">
          <p className="text-base text-primary font-bold">$35 USD</p>
          <p className="text-xs">Get this as low as $0 with Membership</p>
        </div>
      </div>
    );
  };

  return (
    <AppLayout>
      <div>
        <div className=" relative w-full h-[200px] bg-gradient-to-r from-[#274D44] to-[#274D44]/70 flex justify-center">
          <h1 className="text-white font-bold text-[36px] mt-10"> FACILITY</h1>
          <FloatingMenu />
        </div>
        <div className="px-[100px] mt-[100px] ">
          <div className="w-full p-10 rounded-md bg-[#F5F7F2] flex flex-row justify-between">
            <Image
              src={assets.logo}
              width={153}
              height={45}
              alt="logo"
              className="object-contain"
            />
            <div>
              <p className="text-primaryText text-[30px] font-bold">
                Showing Result For November 24, 2024
              </p>
              <p className="text-primaryText text-sm">
                We don't stop playing because we grow old, We grow old because
                we stop playing!! - George Bernard Shaw
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 my-10">
            <LaneCard />
            <LaneCard />
            <LaneCard />
            <LaneCard />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
