import assets from "@/json/assets";
import Image from "next/image";
import React from "react";
import FloatingMenu from "../FloatingMenu/FloatingMenu";
import Link from "next/link";

function HeroSection() {
  return (
    <div className="relative min-h-[80vh] pl-[100px] flex items-center">
      <Image
        src={assets.heroImage}
        width={1600}
        height={700}
        alt="heroImage"
        className="absolute top-0 left-0 z-[-1] h-full w-full object-cover"
      />
      <div className="absolute w-full h-full bg-gradient-to-r from-[#1C1744] to-[#1C1744]/70 top-0 left-0 z-0"></div>
      <div className="relative z-10">
        <h1 className="text-[50px] font-bold text-white uppercase leading-[55px] tracking-tight">
          Sports{" "}
          <span className="text-primary">
            Venue <br />
            booking{" "}
          </span>
          made easy
        </h1>
        <p className="text-lg my-6 text-white max-w-[400px]">
          To enjoy the best cricket experience book our pitch for a game and
          play today.
        </p>
        <div className="mt-10">
          <Link
            href="/membership"
            className="primaryButton !text-primaryText mr-3 font-semibold !py-4"
          >
            Membership
          </Link>
          <Link
            href="/seasonPass"
            className=" text-white font-semibold !py-4 px-5 border-2 border-[#ffffff50] rounded-md"
          >
            Season Pass
          </Link>
        </div>
      </div>
      <FloatingMenu />
    </div>
  );
}

export default HeroSection;
