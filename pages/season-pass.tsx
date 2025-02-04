import {
  getCurrentSeasonPass,
  getSeasonPasses
} from "@/api/functions/season-pass.api";
import SeasonPassCard from "@/components/Homepage/SeasonPassCard";
import AppLayout from "@/layouts/AppLayout";
import { cx } from "@/lib/utils";
import {
  CurrentSeasonPass,
  SeasonPass as ISeasonPass
} from "@/typescript/interface/season-pass.interfaces";
import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const season_passes = await getSeasonPasses("cricket");
  const current_season_pass = cookies.token
    ? await getCurrentSeasonPass("cricket", cookies.token)
    : null;

  return {
    props: { season_passes, current_season_pass }
  };
};

export default function SeasonPass({
  season_passes,
  current_season_pass
}: {
  season_passes: ISeasonPass[];
  current_season_pass: CurrentSeasonPass[];
}) {
  const [sport, setSport] = useState("cricket");
  const cookies = parseCookies();

  const { data } = useQuery({
    queryKey: ["season_passes", sport],
    queryFn: () => getSeasonPasses(sport),
    initialData: season_passes
  });

  const { data: active_plan = [] } = useQuery({
    queryKey: ["current_season_pass", sport],
    queryFn: () => getCurrentSeasonPass(sport),
    initialData: current_season_pass,
    enabled: !!cookies.token
  });

  return (
    <AppLayout>
      <div>
        <div className=" relative w-full h-[150px] bg-gradient-to-r from-[#1C1744] to-[#1C1744]/70 flex justify-center mb-20 max-md:h-[150px] max-md:mb-8">
          <h1 className="text-white font-bold text-[36px] my-auto uppercase">
            Season Pass
          </h1>
        </div>
        <div className="px-[100px] w-full flex flex-col items-center max-lg:px-[40px] max-md:px-[20px]">
          <div className="flex flex-col items-center">
            <h1 className="text-primaryText text-[32px] font-semibold uppercase  max-md:text-2xl max-md:mb-0">
              Season Pass Packages
            </h1>
            <p className="my-4 max-md:text-center">
              Please select the membership package which suits your cricket
              needs
            </p>

            <div className="bg-primary p-2 rounded-md flex flex-row mt-2 mb-10 max-sm:w-full">
              <p
                className={cx(
                  "py-2 px-5 text-white rounded-md pointer cursor-pointer max-sm:w-[50%] max-sm:text-center",
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
                  "py-2 px-5 text-white rounded-md pointer cursor-pointer max-sm:w-[50%] max-sm:text-center",
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
          <div className=" grid grid-cols-2 gap-5 w-full max-md:grid-cols-1">
            {data?.map((_season_pass) => (
              <SeasonPassCard
                {..._season_pass}
                key={_season_pass._id}
                isCurrentPlan={Boolean(
                  active_plan?.find(
                    (_plan) => _season_pass._id === _plan.season_pass_id
                  )
                )}
              />
            ))}
            {/* <MemberShipCard name="Silver" price={279.99} /> */}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
