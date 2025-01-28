import assets from "@/json/assets";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/functions/user.api";
import { setCookieClient } from "@/lib/functions/storage.lib";
import { useRouter } from "next/router";
import { useCartContext } from "../_app";
import moment from "moment";
import { getCurrentMembership } from "@/api/functions/membership.api";

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required()
});

export default function Login() {
  const router = useRouter();
  const { cart, setCart } = useCartContext();

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      setCookieClient("token", data.token);
      setCookieClient("user", JSON.stringify(data.user));
      let membership;
      if (!!cart) {
        membership = await getCurrentMembership(cart?.sport);
      }
      if (!!cart && membership?.type === "free_slots_based") {
        const week_end = moment().endOf("week").endOf("day").unix();
        let free_slots_used = 0;

        const _lanes = (cart?.lanes ?? []).map((_lane) => {
          let discount = _lane.slots.length;

          const weekly_slots_guard =
            moment(cart?.date).unix() <= week_end && !!membership
              ? membership?.available_slots ?? 0
              : 0;

          if (weekly_slots_guard) {
            const available_free_slots =
              free_slots_used >= weekly_slots_guard
                ? 0
                : weekly_slots_guard - free_slots_used;

            discount =
              available_free_slots > _lane.slots.length
                ? 0
                : _lane.slots.length - available_free_slots;

            free_slots_used +=
              available_free_slots > _lane.slots.length
                ? _lane.slots.length
                : _lane.slots.length - available_free_slots;

            _lane.free_slots_used =
              available_free_slots > _lane.slots.length
                ? _lane.slots.length
                : _lane.slots.length - available_free_slots;
          } else {
            _lane.free_slots_used = 0;
          }

          _lane.price = _lane.lane_price * discount;

          return _lane;
        });

        setCart((prev) => ({
          ...prev,
          date: prev!.date,
          sport: prev!.sport,
          lanes: _lanes,
          season_pass: undefined
        }));
      }
      router.push("/");
    }
  });

  const onSubmit = (data: yup.InferType<typeof schema>) => {
    mutate(data);
  };

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
            Sign in to the platform
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Enter your credentials to continue
          </p>

          {/* Email Input */}
          <form onSubmit={handleSubmit(onSubmit)}>
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
                placeholder="john.doe@companyname.com"
                // required
                {...register("email")}
              />
            </div>

            {/* Password Input */}
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
                className="w-full  mt-1  focus:outline-none outline-none bg-[#fafafa]"
                placeholder="Enter password"
                // required
                {...register("password")}
              />
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <Link href="#" className="text-sm  hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full px-4 py-2 !text-white !bg-primary !shadow-[0px_5px_50px_0px_#2C8EE380]"
              isLoading={isPending}
            >
              Log In
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign up here
            </Link>
          </p>
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
