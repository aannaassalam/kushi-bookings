import { getMemberships } from "@/api/functions/membership.api";
import PackageDetails from "@/components/Homepage/Package";
import AppLayout from "@/layouts/AppLayout";
import { Membership } from "@/typescript/interface/membership.interfaces";
import { GetServerSideProps } from "next";
import React from "react";

export const getServerSideProps: GetServerSideProps = async () => {
  const memberships = await getMemberships("cricket");

  return {
    props: { memberships }
  };
};

export default function Memberships({
  memberships
}: {
  memberships: Membership[];
}) {
  return (
    <AppLayout>
      <div>
        <div className=" relative w-full h-[150px] bg-gradient-to-r from-[#1C1744] to-[#1C1744]/70 flex justify-center mb-20">
          <h1 className="text-white font-bold text-[36px] my-auto uppercase">
            Membership
          </h1>
        </div>
        <PackageDetails memberships={memberships} />
      </div>
    </AppLayout>
  );
}
