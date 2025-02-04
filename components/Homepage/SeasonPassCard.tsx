import { SeasonPass } from "@/typescript/interface/season-pass.interfaces";
import { FaCheck } from "react-icons/fa6";
import PaymentModal from "../PaymentForm/PaymentForm";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";
import { cx } from "@/lib/utils";

export default function SeasonPassCard({
  _id,
  name,
  price,
  about,
  expires_in,
  isCurrentPlan,
  number_of_slots
}: SeasonPass & { isCurrentPlan: boolean }) {
  const router = useRouter();
  const cookies = parseCookies();
  const user = !!cookies.user && JSON.parse(cookies.user);
  const [modal, setModal] = useState(false);

  return (
    <div className="bg-[#F5F7F2] p-5 rounded-md flex flex-col">
      <p className="text-black py-2 px-4 text-xs rounded-3xl bg-gray-200 w-max mb-2">
        Number of Slots <span className="font-semibold">{number_of_slots}</span>
      </p>
      <h2 className="text-[24px] font-bold text-primaryText">{name}</h2>
      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 mb-auto max-md:grid-cols-1">
        {about.split("_").map((_key_point) => {
          return (
            <p
              className="text-primaryText flex flex-row items-center text-sm"
              key={_key_point}
            >
              <FaCheck className="mr-4" size={20} />
              <span className="flex-1">{_key_point}</span>
            </p>
          );
        })}
      </div>

      <div className="flex flex-row items-end my-6">
        <span className="text-lg text-primaryText">$</span>
        <span className="text-2xl text-primaryText font-bold mx-1">
          {price}
        </span>
        <span className="text-base text-gray-600 self-start">
          for {expires_in} Days
        </span>
      </div>
      <button
        className={cx(
          "text-primary py-3 w-full font-semibold bg-lightPrimary rounded-md cursor-pointer",
          {
            "!bg-primary !text-white !cursor-not-allowed": isCurrentPlan
          }
        )}
        onClick={() =>
          isCurrentPlan
            ? null
            : user
            ? setModal(true)
            : router.push("/auth/login")
        }
      >
        {isCurrentPlan ? "Purchased" : "Choose"}
      </button>
      <PaymentModal
        type="season_pass"
        season_pass_id={_id}
        isOpen={modal}
        onClose={() => setModal(false)}
        price={price}
      />
    </div>
  );
}
