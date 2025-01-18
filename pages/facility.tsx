import { getFacility } from "@/api/functions/facility.api";
import { getLanes } from "@/api/functions/lane.api";
import { getMemberships } from "@/api/functions/membership.api";
import FloatingMenu from "@/components/FloatingMenu/FloatingMenu";
import assets from "@/json/assets";
import AppLayout from "@/layouts/AppLayout";
import { cx } from "@/lib/utils";
import {
  DaysInterface,
  Facility as IFacility
} from "@/typescript/interface/facility.interfaces";
import { Lane } from "@/typescript/interface/lane.interfaces";
import { Membership } from "@/typescript/interface/membership.interfaces";
import { useQuery } from "@tanstack/react-query";
import { isArray, min } from "lodash";
import moment from "moment";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useCartContext } from "./_app";
import {
  BookingFilter,
  getBookingsForFilter
} from "@/api/functions/bookings.api";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { date, sport, time_slots } = query;

  const slots = isArray(time_slots) ? time_slots : [time_slots || ""];

  const lanes = await getLanes({
    date: date?.toString() || "",
    sport: sport?.toString() || "",
    time_slots: slots
  });

  const facility_data = await getFacility();
  const memberships_data = await getMemberships(sport?.toString() ?? "cricket");
  const bookings_data = await getBookingsForFilter({
    date: date?.toString() || "",
    sport: sport?.toString() || "",
    slots
  });

  return {
    props: {
      lanes,
      facility_data,
      memberships_data,
      bookings_data
    }
  };
};

const LaneCard = ({
  lane,
  price,
  minimum_lane_price,
  bookings
}: {
  lane: Lane;
  price: number;
  minimum_lane_price?: number;
  bookings: BookingFilter;
}) => {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const sport = searchParams.get("sport");
  const time_slots = searchParams.getAll("time_slots");

  const { cart, setCart } = useCartContext();

  const available_slots = useMemo(() => {
    const slots: string[] = [];
    time_slots.forEach((_slot) => {
      if (!bookings[_slot].includes(lane._id)) slots.push(_slot);
    });
    return slots;
  }, [bookings, lane._id, time_slots]);

  const onAddToCart = () => {
    const lanes = (cart?.lanes ?? []).filter(
      (_lane: { lane_id: string }) => _lane.lane_id !== lane._id
    );

    setCart({
      date: date!,
      sport: sport!,
      lanes: [
        ...lanes,
        {
          name: lane.name,
          about: lane.about!,
          lane_id: lane._id,
          slots: available_slots,
          price: price * time_slots.length
        }
      ]
    });
  };

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
      </div>
      <div className="p-4 py-2 flex justify-between items-center gap-3">
        <div className="flex flex-wrap text-xs">
          {time_slots.map((_slot) => {
            const bookings_for_slot = bookings[_slot];
            return (
              <>
                <span
                  key={_slot}
                  className={cx("mr-1.5 mb-0.5", {
                    "text-red-500 font-medium": bookings_for_slot.includes(
                      lane._id
                    )
                  })}
                >
                  {`${moment(_slot, "HH:mm").format("hh:mm A")} - ${moment(
                    _slot,
                    "HH:mm"
                  )
                    .add(1, "hour")
                    .format("hh:mm A")}`}
                </span>
                <span className="mr-1.5">|</span>
              </>
            );
          })}
        </div>
        {/* </div> */}
        <button
          className={cx(
            "bg-lightPrimary py-2 px-4 rounded-full text-primary font-medium text-xs self-start whitespace-nowrap",
            {
              "bg-primary text-white": Boolean(
                cart?.lanes?.find(
                  (_lane: { lane_id: string }) => _lane.lane_id === lane._id
                )
              ),
              "!bg-gray-200 !text-gray-500": !Boolean(available_slots.length)
            }
          )}
          onClick={onAddToCart}
          disabled={!Boolean(available_slots.length)}
        >
          {cart?.lanes?.find(
            (_lane: { lane_id: string }) => _lane.lane_id === lane._id
          )
            ? "Added"
            : "Add to cart"}
        </button>
      </div>
      <div className="p-4 py-2 flex justify-between items-center">
        <p className="text-base text-primary font-bold">${price} USD</p>
        {Boolean(minimum_lane_price) && (
          <p className="text-xs">
            Get this as low as ${minimum_lane_price} with Membership
          </p>
        )}
      </div>
    </div>
  );
};

export default function Facility({
  lanes,
  facility_data,
  memberships_data,
  bookings_data
}: {
  lanes: Lane[];
  facility_data: IFacility;
  memberships_data: Membership[];
  bookings_data: BookingFilter;
}) {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const sport = searchParams.get("sport");
  const time_slots = searchParams.getAll("time_slots");

  const { data } = useQuery({
    queryKey: ["lanes", date, sport, time_slots],
    queryFn: () => getLanes({ date, sport, time_slots }),
    initialData: lanes
  });

  const { data: facility } = useQuery({
    queryKey: ["facility"],
    queryFn: getFacility,
    initialData: facility_data
  });

  const { data: bookings } = useQuery({
    queryKey: ["bookings", date, sport, time_slots],
    queryFn: () =>
      getBookingsForFilter({
        date: date || "",
        sport: sport || "",
        slots: time_slots
      }),
    initialData: bookings_data
  });

  const { data: memberships } = useQuery({
    queryKey: ["memberships", sport],
    queryFn: () => getMemberships(sport?.toString() ?? "cricket"),
    initialData: memberships_data
  });

  const minimum_lane_price = useMemo(() => {
    const facility_prices = memberships.map(
      (_membership) => _membership.facility_price
    );
    return min(facility_prices);
  }, [memberships, sport]);

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
                minimum_lane_price={minimum_lane_price}
                bookings={bookings}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
