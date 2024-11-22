import assets from "@/json/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SlMap } from "react-icons/sl";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();

  return (
    <div className="">
      <div className="w-full grid grid-cols-3 items-center px-[100px] py-10">
        <div>
          <Image src={assets.logo} width={153} height={45} alt="logo" />
          <p className="text-black mt-6 max-w-[400px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis
            fringilla blandit vitae duis blandit ullamcorper ut.
          </p>
        </div>
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
            href="/facility"
            className={` ml-6 ${
              router.pathname.includes("facility")
                ? "text-primary"
                : "text-black"
            }`}
          >
            Facilities
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
          </Link>
        </div>
        <div className="ml-6">
          <p className="text-2xl text-black font-semibold">Follow Us</p>
          <div>
            <p className="max-w-[500px] flex flex-row mt-4 items-center">
              <span className="text-primary mr-6">
                <SlMap size={20} />
              </span>
              23985 Industrial Park Dr, Farmington Hills, MI 48335
            </p>
            <p className="max-w-[500px] flex flex-row mt-4 items-center">
              <span className="text-primary mr-6">
                <FiPhone size={20} />
              </span>
              +123 456 7890
            </p>
            <p className="max-w-[500px] flex flex-row mt-4 items-center">
              <span className="text-primary mr-6">
                <MdOutlineEmail size={20} />
              </span>
              kushibookings@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div className="py-4 border-t border-t-gray-300 grid grid-cols-3 ml-6 px-[100px]">
        <p className="text-xs">
          Copyright © 2024 KUSHI CRICKET NETS. All Rights Reserved
        </p>
        <div></div>
        <div className="flex flex-row">
          <Link href="" className="flex items-center flex-row mr-6">
            <FaFacebookF size={20} className="mr-1" /> Facebook
          </Link>
          <Link href="" className="flex items-center flex-row">
            <FaInstagram size={20} className="mr-1" /> Instagram
          </Link>
        </div>
      </div>
    </div>
  );
}
