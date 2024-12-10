import assets from "@/json/assets";
import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div className="px-[100px] w-full my-[100px] mb-[50px]">
      <div className="relative w-full min-h-[420px] rounded-lg overflow-hidden flex items-center">
        <Image
          src={assets.tennisBall}
          width={1138}
          height={413}
          alt="tennis"
          className="absolute top-0 left-0 w-full z-[-1] h-full object-cover"
        />
        <div className="absolute w-full h-full bg-gradient-to-r from-[#1C1744] to-[#1C1744]/40 top-0 left-0 z-0"></div>
        <div className="relative z-10 pl-10">
          <p className="text-white font-semibold text-lg mb-4 uppercase">
            About Us
          </p>
          <h1 className="text-[32px] font-bold text-white uppercase leading-[40px] tracking-tight">
            Book Our Space For Your Next <br />
            <span className="text-primary">Sports Event Of Celebration!</span>
          </h1>
          <p className="text-lg mt-6 text-white max-w-[600px]">
            Looking for the perfect venue for your sports activities or special
            events? We&apos;ve got you covered!
          </p>
        </div>
      </div>
    </div>
  );
}
