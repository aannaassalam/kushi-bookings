import assets from "@/json/assets";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function ResetPassword() {
  return (
    <div className="flex min-h-screen relative">
      {/* Left Section */}
      <div className="flex flex-col items-center  w-full lg:w-1/2 p-8">
        {/* Logo */}
        <div className=" self-start p-10 relative z-10 mt-6">
          <Image
            src={assets.logo} // Replace with your logo path
            alt="Kushi Cricket Store Logo"
            width={150}
            height={50}
          />
        </div>
        <div className="w-[98%] absolute h-[200px] bg-gradient-to-r from-[#2C8EE31C] to-[#2C8EE300] rounded-lg left-[50%] translate-x-[-50%] top-5"></div>
        {/* Login Form */}
        <div className="bg-white  rounded-lg w-full max-w-md p-6 m-auto">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
            Reset Password
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Enter Your New Password
          </p>

          {/* Email Input */}
          <form>
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
              />
            </div>
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full px-4 py-2 !text-white !bg-primary !shadow-[0px_5px_50px_0px_#2C8EE380] mt-4"
            >
              Submit
            </Button>
          </form>

          {/* Sign Up Link */}
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-200 items-center justify-center">
        <div className=" relative z-10 rounded-lg pr-8">
          <Image
            src={assets.loginImage} // Replace with your image path
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
