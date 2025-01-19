import { getCurrentMembership } from "@/api/functions/membership.api";
import { getCurrentSeasonPass } from "@/api/functions/season-pass.api";
import {
  changePassword,
  getProfile,
  updateProfile
} from "@/api/functions/user.api";
import assets from "@/json/assets";
import AppLayout from "@/layouts/AppLayout";
import { cx } from "@/lib/utils";
import { CurrentMembership } from "@/typescript/interface/membership.interfaces";
import { CurrentSeasonPass } from "@/typescript/interface/season-pass.interfaces";
import { User } from "@/typescript/interface/user.interfaces";
import {
  Box,
  Button,
  HStack,
  VisuallyHiddenInput,
  VStack
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { parseCookies, setCookie } from "nookies";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsCameraFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import { toast } from "sonner";
import * as yup from "yup";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const profile = await getProfile(cookies.token);
  const current_membership = await getCurrentMembership(
    "cricket",
    cookies.token
  );
  const current_season_pass = await getCurrentSeasonPass(
    "cricket",
    cookies.token
  );

  return {
    props: {
      profile,
      current_membership,
      current_season_pass
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

const schema = yup.object().shape({
  email: yup.string().email().required(),
  phone: yup.number().required(),
  full_name: yup.string().required()
});

const changePasswordSchema = yup.object().shape({
  password: yup.string().min(8).required()
});

function Profile({
  profile,
  current_membership,
  current_season_pass
}: {
  profile: User;
  current_membership: CurrentMembership;
  current_season_pass: CurrentSeasonPass[];
}) {
  const [sport, setSport] = useState("cricket");
  const [profile_photo, setProfilePhoto] = useState<File>();

  const { data, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
    initialData: profile
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: data.email,
      phone: data.phone,
      full_name: data.full_name
      // profile_photo: data.profile_photo
    }
  });

  const {
    register: changePasswordRegister,
    handleSubmit: changePasswordHandleSubmit,
    reset
  } = useForm({
    resolver: yupResolver(changePasswordSchema)
  });

  const { data: active_membership } = useQuery({
    queryKey: ["current_membership", sport],
    queryFn: () => getCurrentMembership(sport),
    initialData: current_membership
  });

  const { data: active_season_passes = [] } = useQuery({
    queryKey: ["current_season_pass", sport],
    queryFn: () => getCurrentSeasonPass(sport),
    initialData: current_season_pass
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      refetch();
      setCookie(null, "user", JSON.stringify(data.user));
      refetch();
    }
  });

  const { mutate: changePasswordMutate, isPending: isChanging } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      reset();
    }
  });

  const onSubmit = (body: yup.InferType<typeof schema>) => {
    if (
      profile_photo &&
      !["image/jpeg", "image/png", "image/jpg"].includes(profile_photo.type)
    ) {
      return toast.error("Image type not supported");
    }
    if (profile_photo && profile_photo.size > 12 * 1024 * 1024) {
      return toast.error("File size must not exceed 12 MB");
    }
    mutate({ ...body, profile_photo });
  };

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
          {/* <Box className="rounded-md bg-[#F5F7F2] w-1/4 flex flex-col h-auto">
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
          </Box> */}
          <Box className="w-3/4 mx-auto">
            <Box className="rounded-md bg-[#F5F7F2] w-full flex flex-col p-10 items-center">
              <p className="text-2xl font-bold">Profile Information</p>
              <HStack className="w-full mt-8 !items-start !gap-10">
                <VStack>
                  <label className="group w-[240px] h-[240px] !rounded-2xl overflow-hidden cursor-pointer relative">
                    <Image
                      src={
                        (!!profile_photo
                          ? URL.createObjectURL(profile_photo)
                          : data.profile_photo) || assets.default_user
                      }
                      alt="profile pic"
                      width={240}
                      height={240}
                      className="object-cover"
                    />
                    <Box className="absolute h-full w-full bg-blackAlpha-500 top-0 left-0 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                      <BsCameraFill fontSize={35} color="#fff" />
                    </Box>
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => setProfilePhoto(e.target.files?.[0])}
                    />
                  </label>
                  <Button
                    className="!bg-primary !text-white font-semibold !py-6 w-full mt-1"
                    onClick={handleSubmit(onSubmit)}
                    isLoading={isPending}
                  >
                    Update Profile
                  </Button>
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
                      {...register("full_name")}
                    />
                  </div>
                  {/* <div className="bg-white rounded-lg px-4 py-2 mb-4">
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
                    </div> */}
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
                      {...register("email")}
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
                      {...register("phone")}
                    />
                  </div>
                  <div className="bg-white rounded-lg px-4 py-2 mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="password"
                    >
                      Change Password
                    </label>
                    <form
                      onSubmit={changePasswordHandleSubmit((data) =>
                        changePasswordMutate(data.password)
                      )}
                    >
                      <HStack>
                        <input
                          type="password"
                          id="password"
                          className="w-full  mt-1  focus:outline-none outline-none bg-white"
                          placeholder="Enter Password"
                          {...changePasswordRegister("password")}
                        />
                        <Button
                          className="!all-[unset] !m-0 !bg-[transparent] !h-max !text-primary"
                          type="submit"
                          isLoading={isChanging}
                        >
                          Change
                        </Button>
                      </HStack>
                    </form>
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
                  {active_membership && active_season_passes.length
                    ? `1 active membership and ${active_season_passes.length} active season pass`
                    : active_membership
                    ? "1 active membership"
                    : active_season_passes.length
                    ? `${active_season_passes.length} active season pass`
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
            {Boolean(active_membership) && (
              <ActiveMembership current_membership={active_membership} />
            )}
            {active_season_passes.map((_pass) => {
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
