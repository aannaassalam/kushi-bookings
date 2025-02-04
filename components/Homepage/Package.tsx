import {
  getCurrentMembership,
  getMemberships
} from "@/api/functions/membership.api";
import { cx } from "@/lib/utils";
import {
  CurrentMembership,
  Membership
} from "@/typescript/interface/membership.interfaces";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import MembershipCard from "./MembershipCard";
import { parseCookies } from "nookies";

export default function PackageDetails({
  memberships,
  current_membership
}: {
  memberships: Membership[];
  current_membership: CurrentMembership | null;
}) {
  const [sport, setSport] = useState("cricket");
  const cookies = parseCookies();

  const { data } = useQuery({
    queryKey: ["memberships", sport],
    queryFn: () => getMemberships(sport),
    initialData: memberships
  });

  const { data: active_plan } = useQuery({
    queryKey: ["current_membership", sport],
    queryFn: () => getCurrentMembership(sport),
    initialData: current_membership,
    enabled: !!cookies.token
  });

  return (
    <div className="px-[100px] w-full max-lg:px-[40px] max-md:px-[20px]">
      <div className="flex flex-row justify-between items-center max-md:flex-col max-md:items-start">
        <div>
          <h1 className="text-primaryText text-[32px] font-semibold uppercase max-md:text-2xl max-md:mb-4">
            The Right Plan for You
          </h1>
          <p>
            Please select the membership package which suits your cricket needs
          </p>
        </div>
        <div className="bg-primary p-2 rounded-md flex flex-row max-md:mt-4 max-sm:w-full">
          <p
            className={cx(
              "py-2 px-5 rounded-md cursor-pointer pointer text-white max-sm:w-[50%] text-center",
              {
                "bg-white text-black": sport === "cricket"
              }
            )}
            onClick={() => setSport("cricket")}
          >
            Cricket
          </p>
          <p
            className={cx(
              "py-2 px-5 rounded-md cursor-pointer pointer text-white max-sm:w-[50%] text-center",
              {
                "bg-white text-black": sport === "badminton"
              }
            )}
            onClick={() => setSport("badminton")}
          >
            Badminton
          </p>
        </div>
      </div>
      <div className="p-5 border border-gray-300 grid grid-cols-4 gap-5 mt-10 w-full max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:mt-6">
        {data.map((_membership) => (
          <MembershipCard
            {..._membership}
            key={_membership._id}
            isCurrentPlan={_membership._id === active_plan?.membership_id}
            isUpdatePlan={Boolean(active_plan)}
            active_plan={active_plan}
          />
        ))}

        {/* <MemberShipCard name="Basic Yearly" price={119.99} />
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
          <p className="text-white py-2 px-4 text-xs rounded-3xl bg-lightPrimary w-max mt-8">
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
        <MemberShipCard name="Basic Quarterly" price={999.99} /> */}
      </div>
    </div>
  );
}
