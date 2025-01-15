import { getFacility } from "@/api/functions/facility.api";
import { getLanes } from "@/api/functions/lane.api";
import Cart from "@/components/Cart";
import FloatingMenu from "@/components/FloatingMenu/FloatingMenu";
import assets from "@/json/assets";
import AppLayout from "@/layouts/AppLayout";
import { DaysInterface } from "@/typescript/interface/facility.interfaces";
import { Lane } from "@/typescript/interface/lane.interfaces";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoBagOutline } from "react-icons/io5";

const LaneCard = ({ lane, price }: { lane: Lane; price: number }) => {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
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
          <p className="text-black font-semibold">{lane.name}</p>
          <p className="text-gray-600 text-xs">{lane.about}</p>
        </div>
        <p className="text-primary ml-auto mb-auto">
          <IoBagOutline size={20} />
        </p>
      </div>
      <div className="p-4 py-2 flex justify-between items-center">
        <p className="text-xs">
          <span className="text-gray-600 font-semibold">
            {moment(date).format("MMMM D, YYYY")} |
          </span>{" "}
          05:00 PM - 06:00 PM
        </p>
        <button className="bg-lightPrimary py-2 px-4 rounded-full text-primary font-medium text-xs">
          Available
        </button>
      </div>
      <div className="p-4 py-2 flex justify-between items-center">
        <p className="text-base text-primary font-bold">${price} USD</p>
        <p className="text-xs">Get this as low as $0 with Membership</p>
      </div>
    </div>
  );
};

export default function Facility() {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const sport = searchParams.get("sport");
  const time_slots = searchParams.getAll("time_slots");
  const [showCart, setShowCart] = useState(true);

  const { data } = useQuery({
    queryKey: ["lanes", date, sport, time_slots],
    queryFn: () => getLanes({ date, sport, time_slots })
  });

  const { data: facility } = useQuery({
    queryKey: ["facility"],
    queryFn: getFacility
  });

  return (
    <AppLayout>
      <div>
        <div className=" relative w-full h-[200px] bg-gradient-to-r from-[#1C1744] to-[#1C1744]/70 flex justify-center">
          <h1 className="text-white font-bold text-[36px] mt-10"> FACILITY</h1>
          <FloatingMenu noButton />
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
                Showing Result For {moment(date).format("MMMM D, YYYY")}
              </p>
              <p className="text-primaryText text-sm">
                We don&apos;t stop playing because we grow old, We grow old
                because we stop playing!! - George Bernard Shaw
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 my-10">
            {data?.map((_data) => (
              <LaneCard
                lane={_data}
                key={_data._id}
                price={
                  facility!.price[moment(date).format("dddd") as DaysInterface]
                }
              />
            ))}
          </div>
        </div>
        <Cart open={showCart} close={() => setShowCart(false)} />
      </div>
    </AppLayout>
  );
}
