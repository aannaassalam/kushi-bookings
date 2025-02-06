import assets from "@/json/assets";
import Image from "next/image";
import FloatingMenu from "../FloatingMenu/FloatingMenu";

function HeroSection() {
  return (
    <div className="relative min-h-[80vh] pl-[100px] flex  items-center max-lg:pl-[40px] max-md:h-[95vh] max-md:pl-[20px] ">
      <Image
        src={assets.heroImage}
        width={1600}
        height={700}
        alt="heroImage"
        className="absolute top-0 left-0 z-[-1] h-full w-full object-cover"
      />
      <div className="absolute w-full h-full bg-gradient-to-r from-[#1C1744] to-[#1C1744]/70 top-0 left-0 z-0"></div>
      <div className="relative z-10">
        <h1 className="text-[45px] font-bold text-white uppercase leading-[55px] tracking-tight max-lg:text-[40px] max-lg:leading-[50px] max-md:text-[30px] max-md:leading-[40px]">
          Membership Perks <br />{" "}
          <span className="text-[30px] max-lg:text-[26px]  max-md:text-[24px]">
            Lane booking - As low as $0 per Hour
          </span>{" "}
          <br />{" "}
          <span className="text-primary text-[30px] max-lg:text-[26px]  max-md:text-[24px]">
            10% discount at Kushi Cricket Store
          </span>{" "}
        </h1>
        <p className="text-lg my-6 text-white max-w-[500px]">
          Looking to book lanes in bulk ?? choose our season passes which give
          you discounted prices on bulk bookings .
        </p>
        {/* <div className="mt-10">
          <Link
            href="/membership"
            className="primaryButton !text-primaryText mr-3 font-semibold !py-4"
          >
            Membership
          </Link>
          <Link
            href="/season-pass"
            className=" text-white font-semibold !py-4 px-5 border-2 border-[#ffffff50] rounded-md"
          >
            Season Pass
          </Link>
        </div> */}
      </div>
      <FloatingMenu />
    </div>
  );
}

export default HeroSection;
