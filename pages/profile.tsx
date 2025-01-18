import assets from "@/json/assets";
import AppLayout from "@/layouts/AppLayout";
import { Avatar, Box, Button, Divider, HStack, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { PiSignOutLight } from "react-icons/pi";
import { cx } from "@/lib/utils";
import { FaCheck } from "react-icons/fa6";
const ActiveMemberShip = () => {
  return (
    <div className="bg-[#F5F7F2] p-4 rounded-md flex mt-6">
      <Box className="p-6 flex flex-col  bg-[#EEF0EC] rounded-md w-1/3 mr-2">
        <p className="text-black py-2 px-4 w-max text-xs rounded-3xl mb-2 bg-white">
          Membership
        </p>
        <h2 className="text-[24px] font-bold text-primaryText">Basic Yearly</h2>

        <div className="flex flex-row items-end ">
          <span className="text-2xl font-bold text-primary mr-2">$20</span>

          <span className="text-base text-gray-600 self-start">Yearly</span>
        </div>
      </Box>
      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 mb-auto">
        {[
          "Memberships come with 10% Discount on all Products purchased.",
          "Discounted rate for Machine bat Knocking - $15 ($35 Value).",
          "Member has to be present at the time of their reserved Hour.",
          "This Membership Auto Renews every 3 Months.",
          "NO HIDDEN CHARGES.",
          "4 PLAYERS MAX PER LANE (INCLUDING MEMBER).",
          "$5 per extra person.",
          "BOOKINGS CANNOT BE CANCELLED ONCE RESERVED."
        ].map((_key_point) => {
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
          "text-primary py-3 w-1/5 h-max mt-6 ml-2  font-semibold bg-lightPrimary rounded-md cursor-pointer"
        )}
      >
        Active Plan
      </button>
    </div>
  );
};

function Profile() {
  const [sport, setSport] = useState("cricket");
  return (
    <AppLayout>
      <div>
        <div className=" relative w-full h-[200px] bg-gradient-to-r from-[#1C1744] to-[#1C1744]/70 flex justify-center items-center">
          <h1 className="text-white font-bold text-[36px]  uppercase">
            Profile
          </h1>
        </div>
        <div className="px-[100px] mt-[100px] flex items-stretch">
          <Box className="rounded-md bg-[#F5F7F2] w-1/4 flex flex-col h-auto">
            <Box className="flex flex-col items-center p-6 border-b border-b-gray-200 w-full">
              <Avatar size="xl" src={assets.lane} className="mt-2"></Avatar>
              <p className="font-semibold text-base mt-4">John Doe</p>
              <p className=" text-sm">Member Since November 2023</p>
            </Box>
            <Box className="p-10">
              <HStack className="items-center mb-6">
                <FiUser color="#2C8EE3" size={25} />
                <p className="text-lg">Edit Profile</p>
              </HStack>
              <HStack className="items-center mb-6">
                <IoCartOutline color="#2C8EE3" size={25} />
                <p className="text-lg">My Bookings</p>
              </HStack>
              <HStack className="items-center mb-6">
                <HiOutlineEnvelope color="#2C8EE3" size={25} />
                <p className="text-lg">Memberships & Pass</p>
              </HStack>
            </Box>
            <Button className="m-2 !bg-white flex !justify-start !px-8 mt-auto">
              <PiSignOutLight color="#2C8EE3" size={25} className="mr-2" />
              <p className="text-lg font-normal">Sign Out</p>
            </Button>
          </Box>
          <Box className="w-3/4 ml-4">
            <Box className="rounded-md bg-[#F5F7F2] w-full flex flex-col p-10 items-center">
              <p className="text-2xl font-bold">Profile Information</p>
              <HStack className="w-full mt-8 !items-start">
                <VStack>
                  <Image
                    src={assets.loginImage}
                    alt="profilepic"
                    width={240}
                    height={240}
                    className="w-[240px] h-[240px] !rounded-2xl"
                  />
                  <Button className="!bg-primary !text-white font-semibold !py-6 w-full mt-1">
                    Update Profile
                  </Button>
                </VStack>
                <Box className="flex-1">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white rounded-lg px-4 py-2 mb-4">
                      <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="fName"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="fName"
                        className="w-full  mt-1  focus:outline-none outline-none bg-white"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="bg-white rounded-lg px-4 py-2 mb-4">
                      <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="lName"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lName"
                        className="w-full  mt-1  focus:outline-none outline-none bg-white"
                        placeholder="First Name"
                      />
                    </div>
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
                    />
                  </div>
                  <div className="bg-white rounded-lg px-4 py-2 mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <HStack>
                      <input
                        type="password"
                        id="password"
                        className="w-full  mt-1  focus:outline-none outline-none bg-white"
                        placeholder="Enter Password"
                      />
                      <Button className="!all-[unset] !m-0 !bg-[transparent] !h-max !text-primary">
                        Change
                      </Button>
                    </HStack>
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
                  1 active membership and 1 active season pass
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
            <ActiveMemberShip />
            <ActiveMemberShip />
          </Box>
        </div>
      </div>
    </AppLayout>
  );
}

export default Profile;
