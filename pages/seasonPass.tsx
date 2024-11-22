import AppLayout from "@/layouts/AppLayout";
import React from "react";
import { FaCheck } from "react-icons/fa6";

export default function SeasonPass() {
  const MemberShipCard = ({ name, price }: { name: string; price: number }) => {
    return (
      <div className="bg-[#F5F7F2] p-5 rounded-md">
        <p className="text-black py-2 px-4 text-xs rounded-3xl bg-gray-200 w-max mb-2">
          Price For Members <span className="font-semibold">$15</span>
        </p>
        <h2 className="text-[24px] font-bold text-primaryText">{name}</h2>
        <div className="mt-5">
          <p className="text-primaryText flex flex-row items-center text-sm mb-4">
            <FaCheck className="mr-4" size={20} />
            Pass holder has to be present at the time of their reserved Hour.
          </p>
          <p className="text-primaryText flex flex-row items-center text-sm mb-4">
            <FaCheck className="mr-4" size={20} />
            This season pass does not auto renew
          </p>
          <p className="text-primaryText flex flex-row items-center text-sm mb-4">
            <FaCheck className="mr-4" size={20} />
            NO HIDDEN CHARGES.
          </p>
          <p className="text-primaryText flex flex-row items-center text-sm mb-4">
            <FaCheck className="mr-4" size={20} />4 PLAYERS MAX PER LANE
            (INCLUDING PASSHOLDER).
          </p>
          <p className="text-primaryText flex flex-row items-center text-sm mb-4">
            <FaCheck className="mr-4" size={20} />
            $5 per extra person.
          </p>
          <p className="text-primaryText flex flex-row items-center text-sm mb-4">
            <FaCheck className="mr-4" size={20} />
            BOOKINGS CANNOT BE CANCELLED ONCE RESERVED
          </p>
        </div>

        <div className="flex flex-row items-end my-6">
          <span className="text-lg text-primaryText">$</span>
          <span className="text-2xl text-primaryText font-bold mx-1">
            {price}
          </span>
          <span className="text-base text-gray-600 self-start">
            for 90 Days
          </span>
        </div>
        <button className="text-primary py-3 w-full font-semibold bg-[#7BB93324] rounded-md">
          Choose
        </button>
      </div>
    );
  };

  return (
    <AppLayout>
      <div>
        <div className=" relative w-full h-[150px] bg-gradient-to-r from-[#274D44] to-[#274D44]/70 flex justify-center mb-20">
          <h1 className="text-white font-bold text-[36px] my-auto uppercase">
            Season Pass
          </h1>
        </div>
        <div className="px-[100px] w-full flex flex-col items-center">
          <div className="flex flex-col items-center">
            <h1 className="text-primaryText text-[32px] font-semibold uppercase">
              Season Pass Packages
            </h1>
            <p className="my-4">
              Please select the membership package which suits your cricket
              needs
            </p>

            <div className="bg-primary p-2 rounded-md flex flex-row mt-2 mb-10">
              <p className="py-2 px-5 bg-white rounded-md text-black pointer">
                Cricket
              </p>
              <p className="py-2 px-5  rounded-md text-white font-semibold pointer">
                Badminton
              </p>
            </div>
          </div>
          <div className=" grid grid-cols-2 gap-5 w-full">
            <MemberShipCard name="Bronze" price={149.99} />
            <MemberShipCard name="Silver" price={279.99} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
