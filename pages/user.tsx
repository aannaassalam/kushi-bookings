import { getPublicProfile } from "@/api/functions/user.api";
import assets from "@/json/assets";
import AppLayout from "@/layouts/AppLayout";
import { cx } from "@/lib/utils";
import { CurrentMembership } from "@/typescript/interface/membership.interfaces";
import { CurrentSeasonPass } from "@/typescript/interface/season-pass.interfaces";
import { PublicUserProfile } from "@/typescript/interface/user.interfaces";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user_id } = ctx.query;
  if (!user_id) {
    return {
      props: {},
      redirect: {
        destination: "/404",
        permanent: true
      }
    };
  }

  const profile = await getPublicProfile(user_id?.toString(), "cricket");

  return {
    props: {
      profile
    }
  };
};

const ActiveMembership = ({
  current_membership
}: {
  current_membership: CurrentMembership;
}) => {
  return (
    <div className="bg-[#F5F7F2] p-4 rounded-md flex mt-6">
      <Box className="p-6 flex flex-col  bg-[#EEF0EC] rounded-md w-1/4 mr-2">
        <p className="text-black py-2 px-4 w-max text-xs rounded-3xl mb-2 bg-white">
          Membership
        </p>
        <h2 className="text-[24px] font-bold text-primaryText">
          {current_membership.membership.name}
        </h2>

        <div className="flex flex-row items-end ">
          <span className="text-2xl font-bold text-primary mr-2">
            ${current_membership.membership.price}
          </span>

          <span className="text-base text-gray-600 self-start capitalize">
            {current_membership.membership.recurring_type + "ly"}
          </span>
        </div>
      </Box>
      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 flex-1 mb-auto">
        {current_membership.membership.about.split("_").map((_key_point) => {
          return (
            <p
              className="text-primaryText flex flex-row items-center text-xs"
              key={_key_point}
            >
              <FaCheck className="mr-4 flex-shrink-0" size={15} />
              <span className="flex-1">{_key_point}</span>
            </p>
          );
        })}
      </div>

      <button
        className={cx(
          "text-primary py-3 w-1/6 h-max mt-6 ml-2  font-semibold bg-lightPrimary rounded-md cursor-pointer"
        )}
      >
        Active Plan
      </button>
    </div>
  );
};

const ActiveSeasonPass = ({
  current_season_pass
}: {
  current_season_pass: CurrentSeasonPass;
}) => {
  return (
    <div className="bg-[#F5F7F2] p-4 rounded-md flex mt-6">
      <Box className="p-6 flex flex-col  bg-[#EEF0EC] rounded-md w-1/4 mr-2">
        <p className="text-black py-2 px-4 w-max text-xs rounded-3xl mb-2 bg-white">
          Season Pass
        </p>
        <h2 className="text-[24px] font-bold text-primaryText">
          {current_season_pass.season_pass.name}
        </h2>

        <div className="flex flex-row items-end ">
          <span className="text-2xl font-bold text-primary mr-2">
            ${current_season_pass.season_pass.price}
          </span>

          {/* <span className="text-base text-gray-600 self-start">Yearly</span> */}
        </div>
      </Box>
      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 flex-1 mb-auto">
        {current_season_pass.season_pass.about.split("_").map((_key_point) => {
          return (
            <p
              className="text-primaryText flex flex-row items-center text-xs"
              key={_key_point}
            >
              <FaCheck className="mr-4 flex-shrink-0" size={15} />
              <span className="flex-1">{_key_point}</span>
            </p>
          );
        })}
      </div>

      <button
        className={cx(
          "text-primary py-3 w-1/6 h-max mt-6 ml-2  font-semibold bg-lightPrimary rounded-md cursor-pointer"
        )}
      >
        Expires on:{" "}
        {moment(current_season_pass.expiration_date).format("DD/MM/YYYY")}
      </button>
    </div>
  );
};

function Profile({ profile }: { profile: PublicUserProfile }) {
  const [sport, setSport] = useState("cricket");
  const { user_id } = useRouter().query;

  const { data } = useQuery({
    queryKey: ["public_profile", sport, user_id],
    queryFn: () => getPublicProfile(user_id!.toString(), sport),
    initialData: profile
  });

  console.log(["public_profile", sport, user_id]);

  console.log(profile);

  return (
    <AppLayout>
      <div>
        <div className=" relative w-full h-[200px] bg-gradient-to-r from-[#1C1744] to-[#1C1744]/70 flex justify-center items-center">
          <h1 className="text-white font-bold text-[36px]  uppercase">
            Profile
          </h1>
        </div>
        <div className="px-[100px] mt-[100px] flex">
          <Box className="w-3/4 mx-auto">
            <Box className="rounded-md bg-[#F5F7F2] w-full flex flex-col p-10 items-center">
              <p className="text-2xl font-bold">Profile Information</p>
              <HStack className="w-full mt-8 !items-start !gap-10">
                <VStack className="group w-[240px] h-[240px] !rounded-2xl overflow-hidden cursor-pointer relative">
                  <Image
                    src={data.profile_photo || assets.default_user}
                    alt="profile pic"
                    width={240}
                    height={240}
                    className="object-cover"
                  />
                </VStack>
                <Box className="flex-1">
                  <div className="bg-white rounded-lg px-4 py-2 mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="fName"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fName"
                      className="w-full  mt-1  focus:outline-none outline-none bg-white"
                      placeholder="Full Name"
                      value={data.full_name}
                      readOnly
                    />
                  </div>
                  <div className="bg-white rounded-lg px-4 py-2 mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full  mt-1  focus:outline-none outline-none bg-white"
                      placeholder="Enter Email Address"
                      value={data.email}
                      readOnly
                    />
                  </div>
                  <div className="bg-white rounded-lg px-4 py-2 mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      id="phone"
                      className="w-full  mt-1  focus:outline-none outline-none bg-white"
                      placeholder="Enter Phone Number"
                      value={data.phone}
                      readOnly
                    />
                  </div>
                </Box>
              </HStack>
            </Box>
            <div className="flex flex-row justify-between items-center mt-4">
              <div>
                <h1 className="text-primaryText text-xl font-semibold uppercase">
                  Memberships & Pass
                </h1>
                <p className="tetx-sm">
                  {data.membership && data.season_passes.length
                    ? `1 active membership and ${data.season_passes.length} active season pass`
                    : data.membership
                    ? "1 active membership"
                    : data.season_passes.length
                    ? `${data.season_passes.length} active season pass`
                    : null}
                </p>
              </div>
              <div className="bg-primary p-2 rounded-md flex flex-row">
                <p
                  className={cx(
                    "py-2 px-5 rounded-md cursor-pointer pointer text-white",
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
                    "py-2 px-5 rounded-md cursor-pointer pointer text-white",
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
            {Boolean(data.membership) && (
              <ActiveMembership current_membership={data.membership} />
            )}
            {data.season_passes.map((_pass) => {
              return (
                <ActiveSeasonPass current_season_pass={_pass} key={_pass._id} />
              );
            })}
          </Box>
        </div>
      </div>
    </AppLayout>
  );
}

export default Profile;
