import assets from "@/json/assets";
import Image from "next/image";
import React from "react";

export default function Quote() {
  return (
    <div className="mt-20 relative min-h-[170px] flex flex-col items-center justify-center py-8">
      <Image
        src={assets.greenBackground}
        width={1600}
        height={169}
        alt="background"
        className="absolute top-0 left-0 z-0 h-full object-cover"
      />
      <div className="absolute w-full h-full bg-gradient-to-r from-[#1C1744] to-[#1C1744]/10 top-0 left-0 z-10"></div>
      <p className="text-white text-2xl max-w-[900px] relative z-20 text-center font-bold mb-2">
        Call Us Now For Rental Pricing And Availability
      </p>
      <p className=" text-white text-lg max-w-[900px] relative z-20 text-center font-semibold mb-6">
        Let’s Make Your Event Unforgetable
      </p>
      <p className="italic text-white text-lg max-w-[900px] relative z-20 text-center font-semibold">
        Whether you&apos;re a cricket/badminton enthusiast looking for premium
        gear or want a place to practice your skills, we&apos;ve got you
        covered. Our dedicated team is here to assist you and ensure you have a
        fantastic sporting experience. Elevate your game with us at Kushi
        Cricket Store!
      </p>
    </div>
  );
}
