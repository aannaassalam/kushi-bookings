import PackageDetails from "@/components/Homepage/Package";
import AppLayout from "@/layouts/AppLayout";
import React from "react";

export default function Membership() {
  return (
    <AppLayout>
      <div>
        <div className=" relative w-full h-[150px] bg-gradient-to-r from-[#1C1744] to-[#1C1744]/70 flex justify-center mb-20">
          <h1 className="text-white font-bold text-[36px] my-auto uppercase">
            Membership
          </h1>
        </div>
        <PackageDetails />
      </div>
    </AppLayout>
  );
}
