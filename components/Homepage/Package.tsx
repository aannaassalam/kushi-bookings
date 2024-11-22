import assets from "@/json/assets";
import Image from "next/image";
import React from "react";
import { FaCheck } from "react-icons/fa6";
export default function PackageDetails() {
  const MemberShipCard = ({ name, price }: { name: string; price: number }) => {
    return (
      <div className="bg-[#F5F7F2] p-5 rounded-md">
        <h2 className="text-[24px] font-bold text-primaryText">{name}</h2>
        <div className="mt-5">
          <p className="text-primaryText flex flex-row items-center text-xs mb-4">
            <FaCheck className="mr-4" size={20} />
            Memberships come with 10% Discount on all Products purchased.
          </p>
          <p className="text-primaryText flex flex-row items-center text-xs mb-4">
            <FaCheck className="mr-4" size={20} />
            Discounted rate for Machine bat Knocking - $15 ($35 Value).
          </p>
          <p className="text-primaryText flex flex-row items-center text-xs mb-4">
            <FaCheck className="mr-4" size={20} />
            Member has to be present at the time of their reserved Hour.
          </p>
          <p className="text-primaryText flex flex-row items-center text-xs mb-4">
            <FaCheck className="mr-4" size={20} />
            This Membership Auto Renews every 3 Months.
          </p>
          <p className="text-primaryText flex flex-row items-center text-xs mb-4">
            <FaCheck className="mr-4" size={20} />
            NO HIDDEN CHARGES.
          </p>
          <p className="text-primaryText flex flex-row items-center text-xs mb-4">
            <FaCheck className="mr-4" size={20} />4 PLAYERS MAX PER LANE
            (INCLUDING MEMBER).
          </p>
          <p className="text-primaryText flex flex-row items-center text-xs mb-4">
            <FaCheck className="mr-4" size={20} />
            $5 per extra person.
          </p>
          <p className="text-primaryText flex flex-row items-center text-xs mb-4">
            <FaCheck className="mr-4" size={20} />
            BOOKINGS CANNOT BE CANCELLED ONCE RESERVED
          </p>
        </div>
        <p className="text-black py-2 px-4 text-xs rounded-3xl bg-gray-200 w-max mt-8">
          Price For Members <span className="font-semibold">$15</span>
        </p>
        <div className="flex flex-row items-end my-4">
          <span className="text-lg text-primaryText">$</span>
          <span className="text-2xl text-primaryText font-bold mx-1">
            {price}
          </span>
          <span className="text-base text-gray-600 self-start">Quaterly</span>
        </div>
        <button className="text-primary py-3 w-full font-semibold bg-[#7BB93324] rounded-md">
          Choose
        </button>
      </div>
    );
  };

  return (
    <div className="px-[100px] w-full">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-primaryText text-[32px] font-semibold uppercase">
            The Right Plan for You
          </h1>
          <p>
            Please select the membership package which suits your cricket needs
          </p>
        </div>
        <div className="bg-primary p-2 rounded-md flex flex-row">
          <p className="py-2 px-5 bg-white rounded-md text-black pointer">
            Cricket
          </p>
          <p className="py-2 px-5  rounded-md text-white font-semibold pointer">
            Badminton
          </p>
        </div>
      </div>
      <div className="p-5 border border-gray-300 grid grid-cols-4 gap-5 mt-10 w-full items-center">
        <MemberShipCard name="Basic Quarterly" price={39.99} />
        <MemberShipCard name="Basic Yearly" price={119.99} />
        <div className="bg-primaryText p-5 rounded-md relative">
          <Image
            src={assets.packageGraphic}
            width={260}
            height={475}
            alt="graphic"
            className="absolute top-0 right-0"
          />
          <h2 className="text-[24px] font-bold text-white">Pro Monthly</h2>
          <div className="mt-5">
            <p className="text-white flex flex-row items-center text-xs mb-4">
              <FaCheck className="mr-4" size={20} />
              Memberships come with 10% Discount on all Products purchased.
            </p>
            <p className="text-white flex flex-row items-center text-xs mb-4">
              <FaCheck className="mr-4" size={20} />
              Discounted rate for Machine bat Knocking - $15 ($35 Value).
            </p>
            <p className="text-white flex flex-row items-center text-xs mb-4">
              <FaCheck className="mr-4" size={20} />
              Member has to be present at the time of their reserved Hour.
            </p>
            <p className="text-white flex flex-row items-center text-xs mb-4">
              <FaCheck className="mr-4" size={20} />
              This Membership Auto Renews every 3 Months.
            </p>
            <p className="text-white flex flex-row items-center text-xs mb-4">
              <FaCheck className="mr-4" size={20} />
              NO HIDDEN CHARGES.
            </p>
            <p className="text-white flex flex-row items-center text-xs mb-4">
              <FaCheck className="mr-4" size={20} />4 PLAYERS MAX PER LANE
              (INCLUDING MEMBER).
            </p>
            <p className="text-white flex flex-row items-center text-xs mb-4">
              <FaCheck className="mr-4" size={20} />
              $5 per extra person.
            </p>
            <p className="text-white flex flex-row items-center text-xs mb-4">
              <FaCheck className="mr-4" size={20} />
              BOOKINGS CANNOT BE CANCELLED ONCE RESERVED
            </p>
            <p className="text-white flex flex-row items-center text-xs mb-4">
              <FaCheck className="mr-4" size={20} />
              $5 per extra person.
            </p>
          </div>
          <p className="text-white py-2 px-4 text-xs rounded-3xl bg-[#20433B] w-max mt-8">
            Price For Members <span className="font-semibold">$15</span>
          </p>
          <div className="flex flex-row items-end my-4">
            <span className="text-lg text-white">$</span>
            <span className="text-2xl text-white font-bold mx-1">99.99</span>
            <span className="text-base text-gray-200 self-start">Monthly</span>
          </div>
          <button className="text-white py-3 w-full font-semibold bg-primary rounded-md">
            Choose
          </button>
        </div>
        <MemberShipCard name="Basic Quarterly" price={999.99} />
      </div>
    </div>
  );
}
