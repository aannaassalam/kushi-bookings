import { getSeasonPasses } from "@/api/functions/season-pass.api";
import SeasonPassCard from "@/components/Homepage/SeasonPassCard";
import AppLayout from "@/layouts/AppLayout";
import { cx } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";

export const getServerSideProps: GetServerSideProps = async () => {
  const season_passes = await getSeasonPasses("cricket");

  return {
    props: {
      season_passes
    }
  };
};

export default function SeasonPass() {
  const [sport, setSport] = useState("cricket");

  const { data, isLoading } = useQuery({
    queryKey: ["season_passes", sport],
    queryFn: () => getSeasonPasses(sport)
  });

  return (
    <AppLayout>
      <div>
        <div className=" relative w-full h-[150px] bg-gradient-to-r from-[#1C1744] to-[#1C1744]/70 flex justify-center mb-20">
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
              <p
                className={cx(
                  "py-2 px-5 text-white rounded-md pointer cursor-pointer",
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
                  "py-2 px-5 text-white rounded-md pointer cursor-pointer",
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
          <div className=" grid grid-cols-2 gap-5 w-full">
            {data?.map((_season_pass) => (
              <SeasonPassCard {..._season_pass} key={_season_pass._id} />
            ))}
            {/* <MemberShipCard name="Silver" price={279.99} /> */}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
