import {
  getCurrentMembership,
  getMemberships
} from "@/api/functions/membership.api";
import PackageDetails from "@/components/Homepage/Package";
import AppLayout from "@/layouts/AppLayout";
import {
  CurrentMembership,
  Membership
} from "@/typescript/interface/membership.interfaces";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import React from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const memberships = await getMemberships("cricket");
  const current_membership = cookies.token
    ? await getCurrentMembership("cricket", cookies.token)
    : null;

  return {
    props: { memberships, current_membership }
  };
};

export default function Memberships({
  memberships,
  current_membership
}: {
  memberships: Membership[];
  current_membership: CurrentMembership | null;
}) {
  return (
    <AppLayout>
      <div>
        <div className=" relative w-full h-[150px] bg-gradient-to-r from-[#1C1744] to-[#1C1744]/70 flex justify-center mb-20">
          <h1 className="text-white font-bold text-[36px] my-auto uppercase">
            Membership
          </h1>
        </div>
        <PackageDetails
          memberships={memberships}
          current_membership={current_membership}
        />
      </div>
    </AppLayout>
  );
}
