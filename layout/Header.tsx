import assets from "@/json/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="py-2 px-10 flex flex-row justify-between items-center">
      <Image src={assets.logo} width={153} height={45} alt="logo" />
      <div className="flex flex-row items-center">
        <Link href="" className="text-primary ml-2">
          Home
        </Link>
        <Link href="" className="text-primary ml-2">
          Facilities
        </Link>
        <Link href="" className="text-primary ml-2">
          Membership
        </Link>
        <Link href="" className="text-primary ml-2">
          Pass
        </Link>
      </div>
    </div>
  );
}
