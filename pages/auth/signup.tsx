import { signup } from "@/api/functions/user.api";
import assets from "@/json/assets";
import { setCookieClient } from "@/lib/functions/storage.lib";
import { Box, Button } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineFileUpload } from "react-icons/md";
import { toast } from "sonner";

import * as yup from "yup";

const schema = yup.object().shape({
  full_name: yup.string().required(),
  phone: yup.number().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  confirm_password: yup.string().required()
});

export default function SignUp() {
  const router = useRouter();
  const [profile_picture, setProfile_picture] = useState<File>();

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      setCookieClient("token", data.token);
      setCookieClient("user", JSON.stringify(data.user));
      router.push("/");
    }
  });

  const onSubmit = (data: yup.InferType<typeof schema>) => {
    if (!profile_picture) {
      toast.error("Please Upload a profile picture");
      return;
    }
    mutate({ ...data, profile_photo: profile_picture });
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Left Section */}
      <div className="flex flex-col items-center  w-full lg:w-1/2 p-8">
        <div className=" self-start p-10 relative z-10 mt-6">
          <Image
            src={assets.logo}
            alt="Kushi Cricket Store Logo"
            width={150}
            height={50}
          />
        </div>
        <div className="w-[98%] absolute h-[200px] bg-gradient-to-r from-[#2C8EE31C] to-[#2C8EE300] rounded-lg left-[50%] translate-x-[-50%] top-5"></div>
        {/* Login Form */}
        <div className="bg-white  rounded-lg w-full max-w-md p-6 m-auto">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2 mt-9">
            Sign Up For The Platform
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Enter your details to continue
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-[#fafafa] rounded-lg mb-4 px-4 py-2">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="fname"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fname"
                className="w-full mt-1  focus:outline-none outline-none bg-[#fafafa]"
                placeholder="Enter Full name"
                {...register("full_name")}
              />
            </div>

            {/* </HStack> */}
            <div className="bg-[#fafafa] rounded-lg  px-4 py-2 mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full  mt-1  focus:outline-none outline-none bg-[#fafafa]"
                placeholder="Enter email address"
                {...register("email")}
              />
            </div>
            <div className="bg-[#fafafa] rounded-lg  px-4 py-2 mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                type="number"
                id="phone"
                className="w-full mt-1  focus:outline-none outline-none bg-[#fafafa]"
                placeholder="Enter phone number"
                {...register("phone")}
              />
            </div>
            <div className="bg-[#fafafa] rounded-lg  px-4 py-2 mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full mt-1  focus:outline-none outline-none bg-[#fafafa]"
                placeholder="Enter password"
                {...register("password")}
              />
            </div>
            <div className="bg-[#fafafa] rounded-lg  px-4 py-2 mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full mt-1  focus:outline-none outline-none bg-[#fafafa]"
                placeholder="Enter confirm password"
                {...register("confirm_password")}
              />
            </div>
            <div className="bg-[#fafafa] rounded-lg px-4 py-4 mb-4">
              <label
                className="text-sm font-medium text-gray-700 flex-col flex cursor-pointer"
                htmlFor="profile-picture"
              >
                <Box className="flex">
                  <MdOutlineFileUpload size={20} className="mr-2" />{" "}
                  {profile_picture
                    ? profile_picture.name
                    : "Click to upload Profile Picture"}
                </Box>
                {/* <p className=" text-gray-500 mt-2">Screenshot1.png</p>  if image selected then show */}
              </label>
              <input
                type="file"
                id="profile-picture"
                className="w-full mt-1 hidden focus:outline-none outline-none bg-[#fafafa]"
                accept="image/*"
                onChange={(e) => setProfile_picture(e.target.files?.[0])}
              />
            </div>
            <Button
              type="submit"
              className="w-full px-4 py-2 !text-white !bg-primary !shadow-[0px_5px_50px_0px_#2C8EE380] cursor-pointer"
              isLoading={isPending}
            >
              Register
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
      {/* Right Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-200 items-center justify-center">
        <div className=" relative z-10 rounded-lg pr-8">
          <Image
            src={assets.loginImage}
            alt="Tennis court"
            width={748}
            height={936}
            objectFit="cover"
            className="rounded-lg h-[700px]"
          />
        </div>
      </div>
    </div>
  );
}
