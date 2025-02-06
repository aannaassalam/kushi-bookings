import { forgotPassword } from "@/api/functions/user.api";
import CustomInput from "@/components/CustomInput";
import assets from "@/json/assets";
import validationText from "@/json/messages/validationText";
import { Button } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().required(validationText.error.enter_email)
});

export default function ForgotPassword() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      router.push("/auth/login");
    }
  });

  const onSubmit = (body: yup.InferType<typeof schema>) => {
    mutate(body.email);
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
            Forgot Password
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Enter Your Email to reset your password
          </p>

          {/* Email Input */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              id="email"
              text="Email Address"
              type="email"
              placeholder="johndoe@example.com"
              validationProps={{ ...register("email") }}
              error={errors?.email?.message || ""}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full px-4 py-2 !text-white !bg-primary !shadow-[0px_5px_50px_0px_#2C8EE380] mt-4"
              isLoading={isPending}
            >
              Submit
            </Button>
            <p className="mt-6 text-sm text-center text-gray-600">
              <Link
                href="/auth/login"
                className="text-primary font-semibold hover:underline"
              >
                Back to login
              </Link>
            </p>
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
