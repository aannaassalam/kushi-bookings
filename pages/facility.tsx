import { getFacility } from "@/api/functions/facility.api";
import { getLanes } from "@/api/functions/lane.api";
import {
  getCurrentMembership,
  getMemberships
} from "@/api/functions/membership.api";
import FloatingMenu from "@/components/FloatingMenu/FloatingMenu";
import assets from "@/json/assets";
import AppLayout from "@/layouts/AppLayout";
import { cx } from "@/lib/utils";
import {
  DaysInterface,
  Facility as IFacility
} from "@/typescript/interface/facility.interfaces";
import { Lane } from "@/typescript/interface/lane.interfaces";
import {
  CurrentMembership,
  Membership
} from "@/typescript/interface/membership.interfaces";
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
import { parseCookies } from "nookies";
import { Checkbox, CheckboxGroup, Skeleton } from "@chakra-ui/react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { date, sport, time_slots } = ctx.query;
  const cookies = parseCookies(ctx);

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
  const current_membership = cookies.token
    ? await getCurrentMembership("cricket", cookies.token)
    : null;

  return {
    props: {
      lanes,
      facility_data,
      memberships_data,
      bookings_data,
      current_membership
    }
  };
};

const LaneCard = ({
  lane,
  price,
  minimum_lane_price,
  bookings,
  current_membership,
  isLoading
}: {
  lane: Lane;
  price: number;
  minimum_lane_price?: number;
  bookings: BookingFilter;
  current_membership: CurrentMembership;
  isLoading: boolean;
}) => {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const sport = searchParams.get("sport");
  const time_slots = searchParams.getAll("time_slots");

  const { cart, setCart } = useCartContext();
  const week_end = moment().endOf("week").endOf("day").unix();

  const available_slots = useMemo(() => {
    const slots: string[] = [];
    time_slots.forEach((_slot) => {
      if (!bookings[_slot]?.includes(lane._id)) slots.push(_slot);
    });
    return slots;
  }, [bookings, lane._id, time_slots]);

  const discounted_price = useMemo(() => {
    if (current_membership) {
      return current_membership.membership.facility_price;
    }
    return price;
  }, [current_membership, price]);

  const onAddToCart = () => {
    const lanes = (cart?.lanes ?? []).filter(
      (_lane: { lane_id: string }) => _lane.lane_id !== lane._id
    );

    const free_slots_used = lanes.reduce(
      (prev, current) => prev + current.free_slots_used,
      0
    );

    const weekly_slots_guard =
      moment(date).unix() <= week_end && !!current_membership
        ? current_membership.available_slots
        : 0;

    const available_free_slots =
      free_slots_used >= weekly_slots_guard
        ? 0
        : weekly_slots_guard - free_slots_used;

    const discount =
      available_free_slots > available_slots.length
        ? 0
        : available_slots.length - available_free_slots;

    setCart({
      date: date!,
      sport: sport!,
      membership: current_membership,
      lanes: [
        ...lanes,
        {
          name: lane.name,
          lane_price: discounted_price,
          about: lane.about!,
          lane_id: lane._id,
          slots: available_slots,
          price: discounted_price * discount,
          free_slots_used:
            available_slots.length >= available_free_slots
              ? available_free_slots
              : available_free_slots - available_slots.length
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
        <Skeleton isLoaded={!isLoading}>
          <div className="flex flex-wrap text-xs">
            {time_slots.map((_slot) => {
              const bookings_for_slot = bookings[_slot];
              console.log(bookings_for_slot, _slot);
              return (
                <>
                  <span
                    key={lane._id + _slot}
                    className={cx("mr-1.5 mb-0.5", {
                      "text-red-500 font-medium": bookings_for_slot?.includes(
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
        </Skeleton>
        {/* </div> */}
        <Skeleton isLoaded={!isLoading}>
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
        </Skeleton>
      </div>
      <div className="p-4 py-2 flex justify-between items-center">
        <Skeleton isLoaded={!isLoading}>
          <p className="text-base text-primary font-bold">
            ${discounted_price} USD
          </p>
        </Skeleton>
        <Skeleton isLoaded={!isLoading}>
          {current_membership?.type === "free_slots_based" ? (
            <p className="text-xs">
              {moment(date).unix() <= week_end
                ? current_membership.available_slots
                : 0}{" "}
              free slots available
            </p>
          ) : Boolean(minimum_lane_price) ? (
            <p className="text-xs">
              Get this as low as ${minimum_lane_price} with Membership
            </p>
          ) : null}
        </Skeleton>
      </div>
    </div>
  );
};

export default function Facility({
  lanes,
  facility_data,
  memberships_data,
  bookings_data,
  current_membership
}: {
  lanes: Lane[];
  facility_data: IFacility;
  memberships_data: Membership[];
  bookings_data: BookingFilter;
  current_membership: CurrentMembership;
}) {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const sport = searchParams.get("sport");
  const time_slots = searchParams.getAll("time_slots");
  const week_end = moment().endOf("week").endOf("day").unix();
  const { cart, setCart } = useCartContext();

  const { data } = useQuery({
    queryKey: ["lanes", date, sport, time_slots],
    queryFn: () => getLanes({ date, sport, time_slots }),
    initialData: lanes
  });

  const { data: facility, isPending } = useQuery({
    queryKey: ["facility"],
    queryFn: getFacility,
    initialData: facility_data
  });

  const { data: bookings, isPending: isBookingsLoading } = useQuery({
    queryKey: ["bookings", date, sport, time_slots],
    queryFn: () =>
      getBookingsForFilter({
        date: date || "",
        sport: sport || "",
        slots: time_slots
      }),
    initialData: bookings_data
  });

  const { data: memberships, isPending: isMembershipLoading } = useQuery({
    queryKey: ["memberships", sport],
    queryFn: () => getMemberships(sport?.toString() ?? "cricket"),
    initialData: memberships_data
  });

  const { data: user_membership, isPending: isUserMembershipLoading } =
    useQuery({
      queryKey: ["current_membership", sport],
      queryFn: () => getCurrentMembership(sport!.toString()),
      initialData: current_membership,
      enabled: !!current_membership
    });

  const minimum_lane_price = useMemo(() => {
    const facility_prices = memberships.map(
      (_membership) => _membership.facility_price
    );
    return min(facility_prices);
  }, [memberships]);

  const box_booking_not_available = useMemo(() => {
    return Object.keys(bookings).some((_key) => bookings[_key].length > 0);
  }, [bookings]);

  const discounted_price = useMemo(() => {
    if (current_membership) {
      return current_membership.membership.facility_price;
    }
    return facility.price[moment(date).format("dddd") as DaysInterface];
  }, [current_membership, date, facility.price]);

  const onBoxBooking = () => {
    let free_slots_used = 0;
    if (Boolean(cart?.box_booking_price)) {
      setCart(undefined);
    } else {
      const weekly_slots_guard =
        moment(date).unix() <= week_end && !!current_membership
          ? current_membership.available_slots
          : 0;
      const _lanes = lanes.map((_lane) => {
        const available_free_slots =
          free_slots_used >= weekly_slots_guard
            ? 0
            : weekly_slots_guard - free_slots_used;

        const discount =
          available_free_slots >= time_slots.length
            ? 0
            : time_slots.length - available_free_slots;

        free_slots_used += available_free_slots
          ? available_free_slots >= time_slots.length
            ? time_slots.length
            : time_slots.length - available_free_slots
          : 0;

        return {
          name: _lane.name,
          lane_price: discounted_price,
          about: _lane.about!,
          lane_id: _lane._id,
          slots: time_slots,
          price: discounted_price * discount,
          free_slots_used: available_free_slots
            ? available_free_slots >= time_slots.length
              ? time_slots.length
              : time_slots.length - available_free_slots
            : 0
        };
      });

      setCart({
        date: date!,
        sport: sport!,
        membership: current_membership,
        box_booking_price: facility.box_booking_price,
        lanes: _lanes
      });
    }
  };

  console.log(Boolean(cart?.box_booking_price));

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
          <div className="w-full p-7 rounded-md flex flex-row justify-end">
            <CheckboxGroup
              value={[cart?.box_booking_price || ""]}
              onChange={() => onBoxBooking()}
            >
              <Checkbox
                className="font-medium border-2 p-3 rounded-lg"
                value={facility?.box_booking_price}
                disabled={box_booking_not_available}
              >
                Box Booking
              </Checkbox>
            </CheckboxGroup>
          </div>
          <div className="grid grid-cols-3 gap-4 my-0">
            {data?.map((_data) => (
              <LaneCard
                lane={_data}
                key={_data._id}
                price={
                  facility!.price[moment(date).format("dddd") as DaysInterface]
                }
                minimum_lane_price={minimum_lane_price}
                bookings={bookings}
                current_membership={user_membership}
                isLoading={
                  isPending ||
                  isBookingsLoading ||
                  isMembershipLoading ||
                  isUserMembershipLoading
                }
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
