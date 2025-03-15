import { signup } from "@/api/functions/user.api";
import CustomInput from "@/components/CustomInput";
import assets from "@/json/assets";
import validationText from "@/json/messages/validationText";
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
  full_name: yup.string().required(validationText.error.fullName),
  phone: yup
    .number()
    .test(
      "len",
      "Phone number must be exactly 10 digits",
      (val) => val?.toString().length === 10
    )
    .required(validationText.error.phoneNumberIsValid),
  email: yup.string().required(validationText.error.enter_email),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required(validationText.error.passwordTooShort),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(validationText.error.enter_password_confirm)
});

export default function SignUp() {
  const router = useRouter();
  const [profile_picture, setProfile_picture] = useState<File>();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
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
          <Link href="/">
            <Image
              src={assets.logo}
              alt="Kushi Cricket Store Logo"
              width={150}
              height={50}
            />
          </Link>
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
            <CustomInput
              id="fname"
              text="Full Name"
              type="text"
              placeholder="Enter Full name"
              validationProps={register("full_name")}
              error={errors?.full_name?.message || ""}
              isRequired={true}
            />
            <CustomInput
              id="email"
              text="Email Address"
              type="email"
              placeholder="Enter email address"
              validationProps={register("email")}
              error={errors?.email?.message || ""}
              isRequired={true}
            />
            <CustomInput
              id="phone"
              text="Phone Number"
              type="number"
              placeholder="Enter phone number"
              validationProps={register("phone")}
              error={errors?.phone?.message || ""}
              isRequired={true}
            />
            <CustomInput
              id="password"
              text="Password"
              type="password"
              placeholder="Enter Password"
              validationProps={register("password")}
              error={errors?.password?.message || ""}
              isRequired={true}
            />

            <CustomInput
              id="confirm_password"
              text="Confirm Password"
              type="password"
              placeholder="Enter Confirm Password"
              validationProps={register("confirm_password")}
              error={errors?.confirm_password?.message || ""}
              isRequired={true}
            />

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
                  <p className="text-red-600">*</p>
                </Box>
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
