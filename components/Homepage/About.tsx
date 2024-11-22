import assets from "@/json/assets";
import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div className="px-[100px] w-full my-[100px] ">
      <div className="relative w-full min-h-[420px] rounded-lg overflow-hidden flex items-center">
        <Image
          src={assets.tennisBall}
          width={1138}
          height={413}
          alt="tennis"
          className="absolute top-0 left-0 w-full z-[-1] h-full object-cover"
        />
        <div className="absolute w-full h-full bg-gradient-to-r from-[#274D44] to-[#274D44]/40 top-0 left-0 z-0"></div>
        <div className="relative z-10 pl-10">
          <p className="text-white font-semibold text-lg mb-4 uppercase">
            About Us
          </p>
          <h1 className="text-[32px] font-bold text-white uppercase leading-[40px] tracking-tight">
            Welcome to Kushi Cricket <br /> Store in{" "}
            <span className="text-primary">Farmington Hills</span>
          </h1>
          <p className="text-lg mt-6 text-white max-w-[600px]">
            We are your one-stop-shop for top-quality cricket and badminton
            equipment, batting cages, and badminton courts for rent, creating
            the perfect space for practice and play. Additionally, we provide
            expert repair services for damaged bats, ensuring you&apos;re always
            at the top of your game.
          </p>
        </div>
      </div>
    </div>
  );
}
