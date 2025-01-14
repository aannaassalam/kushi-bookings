import assets from "@/json/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoBagOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";
export default function Header() {
  const router = useRouter();
  return (
    <div className="py-5 px-[100px] flex flex-row justify-between items-center">
      <Image src={assets.logo} width={153} height={45} alt="logo" />
      <div className="flex flex-row items-center">
        <Link
          href="/"
          className={`  ${
            router.pathname === "/" ? "text-primary" : "text-black"
          }`}
        >
          Home
        </Link>
        <Link
          href="/"
          className={`ml-6  ${
            router.pathname === "/my-bookings" ? "text-primary" : "text-black"
          }`}
        >
          My Bookings
        </Link>
        {/* <Link
          href="/facility"
          className={` ml-6 ${
            router.pathname.includes("facility") ? "text-primary" : "text-black"
          }`}
        >
          Facility
        </Link>
        <Link
          href="/membership"
          className={` ml-6 ${
            router.pathname.includes("membership")
              ? "text-primary"
              : "text-black"
          }`}
        >
          Membership
        </Link>
        <Link
          href="/seasonPass"
          className={` ml-6 ${
            router.pathname.includes("seasonPass")
              ? "text-primary"
              : "text-black"
          }`}
        >
          Season Pass
        </Link> */}
        <Link href="" className="text-primary ml-6 mr-[20px]">
          <IoBagOutline size={20} />
        </Link>
        <Button
          as={Link}
          href="/auth/login"
          className="primaryButton"
          colorScheme="primary"
        >
          Login
        </Button>
      </div>
    </div>
  );
}
