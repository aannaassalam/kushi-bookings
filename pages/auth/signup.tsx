import assets from "@/json/assets";
import { Button, HStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
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
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
            Sign Up For The Platform
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Enter your details to continue
          </p>
          <HStack className="mb-4 ">
            <div className="bg-[#fafafa] rounded-lg  px-4 py-2">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="fname"
              >
                First Name
              </label>
              <input
                type="text"
                id="fname"
                className="w-full mt-1  focus:outline-none outline-none bg-[#fafafa]"
                placeholder="Enter first name"
                required
              />
            </div>
            <div className="bg-[#fafafa] rounded-lg  px-4 py-2">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="lname"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                className="w-full  mt-1  focus:outline-none outline-none bg-[#fafafa]"
                placeholder="Enter last name"
                required
              />
            </div>
          </HStack>
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
              required
            />
          </div>
          <div className="bg-[#fafafa] rounded-lg  px-4 py-2 mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="phone"
            >
              Email Phone Number
            </label>
            <input
              type="number"
              id="phone"
              className="w-full mt-1  focus:outline-none outline-none bg-[#fafafa]"
              placeholder="Enter phone number"
              required
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
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full px-4 py-2 text-white bg-primary !shadow-[0px_5px_50px_0px_#2C8EE380]"
          >
            Register
          </Button>

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
