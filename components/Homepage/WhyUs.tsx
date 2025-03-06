import assets from "@/json/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function WhyUs() {
  return (
    <div className="px-[100px] w-full mb-[50px] max-lg:px-[40px] max-md:px-[20px]">
      <div className="flex flex-col justify-between items-center">
        <h1 className="text-primaryText text-[32px] font-semibold uppercase">
          Collaborators
        </h1>
        <div className="flex flex-row w-full justify-center mt-6 my-10  gap-4">
          <Link href="https://www.instagram.com/farmingtoncricketclub?igsh=YnZxcGt2aGc0dzJh">
            <p className="text-primaryText font-semibold p-2 px-4 bg-lightPrimary rounded-lg max-sm:w-full text-center flex flex-col items-center">
              <Image
                src={assets.fcc}
                alt="fcc"
                width={100}
                height={100}
                className="mb-2"
              />
              FCC
            </p>
          </Link>
          <Link href="https://www.instagram.com/cricket_badger_hub?igsh=MW5mN3cydDdlZWVhYQ==">
            <p className="text-primaryText font-semibold p-4 bg-lightPrimary rounded-lg max-sm:w-full text-center flex flex-col items-center">
              <Image
                src={assets.cricketBadger}
                alt="cricket badger"
                width={70}
                height={70}
                className="mb-3 rounded-lg"
              />
              Cricket Badger
            </p>
          </Link>
        </div>
        <h2 className="text-primaryText text-xl font-bold capitalize">
          Our Versatile space is ideal for
        </h2>
        <div className="grid grid-cols-5 gap-4 w-full my-10 max-xl:grid-cols-3 max-sm:grid-cols-2 ">
          <div className="py-4 px-4 rounded-lg max-sm:pr-0 w-full group bg-lightPrimary/5 transition-all duration-300 hover:shadow-[0px_10px_20px_0px_#00000020]">
            <div className="p-4 bg-lightPrimary w-max rounded-lg transition-all duration-300">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.34 17.77L15.75 16.36L20 20.58L18.56 22L14.34 17.77ZM18.5 2C19.4283 2 20.3185 2.36875 20.9749 3.02513C21.6313 3.6815 22 4.57174 22 5.5C22 6.42826 21.6313 7.3185 20.9749 7.97487C20.3185 8.63125 19.4283 9 18.5 9C17.5718 9 16.6815 8.63125 16.0251 7.97487C15.3688 7.3185 15 6.42826 15 5.5C15 4.57174 15.3688 3.6815 16.0251 3.02513C16.6815 2.36875 17.5718 2 18.5 2ZM2.24001 7.11L5.07001 4.28C5.26077 4.09251 5.51754 3.98744 5.78501 3.98744C6.05248 3.98744 6.30925 4.09251 6.50001 4.28L14.97 12.77C15.36 13.16 15.36 13.79 14.97 14.18L12.14 17C12.0477 17.095 11.9374 17.1704 11.8154 17.222C11.6935 17.2735 11.5624 17.3001 11.43 17.3001C11.2976 17.3001 11.1666 17.2735 11.0446 17.222C10.9227 17.1704 10.8123 17.095 10.72 17L2.24001 8.53C1.85001 8.13 1.85001 7.5 2.24001 7.11Z"
                  fill="#2C8EE3"
                />
              </svg>
            </div>
            <h2 className="text-primaryText capitalize text-[20px] font-semibold mt-6">
              Box Cricket <br /> Matches
            </h2>
            <p className="mt-2 text-sm text-black">
              Enjoy a thrilling game with friends or colleagues
            </p>
          </div>
          <div className="py-4 px-4 rounded-lg max-sm:pr-0 w-full group bg-lightPrimary/5 transition-all duration-300 hover:shadow-[0px_10px_20px_0px_#00000020]">
            <div className="p-4 bg-lightPrimary w-max rounded-lg transition-all duration-300">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM8.244 4.373L11.252 6.173V8.366L8.461 10.394L6.417 9.687L5.83 6.153C6.5228 5.42127 7.34019 4.81855 8.244 4.373ZM3.621 13.439L5.948 11.112L7.988 11.817L9.07 15.15L8.1 16.725L4.807 16.531C4.21277 15.5881 3.80979 14.5375 3.621 13.439ZM10.53 20.373L9.346 17.564L10.309 15.997H13.681L14.593 17.578L13.553 20.358C12.5541 20.5415 11.5306 20.5465 10.53 20.373ZM18.892 16.976L15.868 16.786L14.93 15.162L16.017 11.817L18.03 11.121L20.342 13.641C20.1049 14.8443 19.6103 15.982 18.892 16.976ZM18.172 6.156L17.583 9.689L15.543 10.394L12.752 8.366V6.172L15.754 4.372C16.6596 4.81835 17.4783 5.42245 18.172 6.156Z"
                  fill="#2C8EE3"
                />
              </svg>
            </div>
            <h2 className="text-primaryText capitalize text-[20px] font-semibold mt-6">
              Kid&apos;s Soccer <br />
              Games
            </h2>
            <p className="mt-2 text-sm text-black">
              Create fun memories for the little ones.
            </p>
          </div>
          <div className="py-4 px-4 rounded-lg max-sm:pr-0 w-full group bg-lightPrimary/5 transition-all duration-300 hover:shadow-[0px_10px_20px_0px_#00000020]">
            <div className="p-4 bg-lightPrimary w-max rounded-lg transition-all duration-300">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.51702 2C6.07252 2.00006 5.63454 2.10694 5.23997 2.31163C4.84541 2.51633 4.50581 2.81284 4.24978 3.1762C3.99376 3.53956 3.8288 3.95913 3.7688 4.39956C3.7088 4.83999 3.75552 5.28839 3.90502 5.707L7.22402 15H16.776L20.096 5.707C20.3023 5.12919 20.3113 4.49929 20.1215 3.91585C19.9316 3.33242 19.5537 2.82837 19.0469 2.4826C18.5401 2.13683 17.9329 1.96884 17.3205 2.00492C16.708 2.041 16.1247 2.27911 15.662 2.682C15.151 2.24015 14.4975 1.99793 13.822 2C13.127 2 12.492 2.25 12 2.667C11.4921 2.23507 10.8467 1.99855 10.18 2C9.47002 2 8.83002 2.26 8.34002 2.682C7.83486 2.24163 7.18718 1.99932 6.51702 2ZM16.062 17H7.93802L8.00002 17.173V18C8.00002 19.0609 8.42144 20.0783 9.17159 20.8284C9.92174 21.5786 10.9392 22 12 22C13.0609 22 14.0783 21.5786 14.8284 20.8284C15.5786 20.0783 16 19.0609 16 18V17.173L16.062 17Z"
                  fill="#2C8EE3"
                />
              </svg>
            </div>
            <h2 className="text-primaryText capitalize text-[20px] font-semibold mt-6">
              Badminton <br /> Tournament
            </h2>
            <p className="mt-2 text-sm text-black">
              Organize a competitive yet enjoyable event.
            </p>
          </div>
          <div className="py-4 px-4 rounded-lg max-sm:pr-0 w-full group bg-lightPrimary/5 transition-all duration-300 hover:shadow-[0px_10px_20px_0px_#00000020]">
            <div className="p-4 bg-lightPrimary w-max rounded-lg transition-all duration-300">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.6 2.2C12.4269 2.07018 12.2164 2 12 2C11.7836 2 11.5731 2.07018 11.4 2.2C10.9834 2.51918 10.5992 2.87858 10.253 3.273C9.73 3.862 9 4.855 9 6C9 6.79565 9.31607 7.55871 9.87868 8.12132C10.4413 8.68393 11.2044 9 12 9H6C5.20435 9 4.44129 9.31607 3.87868 9.87868C3.31607 10.4413 3 11.2044 3 12V14C3 15.236 4.411 15.942 5.4 15.2L6.067 14.7C6.2401 14.5702 6.45063 14.5 6.667 14.5C6.88337 14.5 7.0939 14.5702 7.267 14.7L7.533 14.9C8.05229 15.2895 8.68389 15.5 9.333 15.5C9.98211 15.5 10.6137 15.2895 11.133 14.9L11.4 14.7C11.5731 14.5702 11.7836 14.5 12 14.5C12.2164 14.5 12.4269 14.5702 12.6 14.7L12.867 14.9C13.3863 15.2895 14.0179 15.5 14.667 15.5C15.3161 15.5 15.9477 15.2895 16.467 14.9L16.733 14.7C16.9061 14.5702 17.1166 14.5 17.333 14.5C17.5494 14.5 17.7599 14.5702 17.933 14.7L18.6 15.2C19.589 15.942 21 15.236 21 14V12C21 11.2044 20.6839 10.4413 20.1213 9.87868C19.5587 9.31607 18.7956 9 18 9H12C12.7956 9 13.5587 8.68393 14.1213 8.12132C14.6839 7.55871 15 6.79565 15 6C15 4.855 14.27 3.862 13.747 3.273C13.401 2.883 13.017 2.513 12.6 2.2ZM4 17.415V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V17.415C19.7673 17.4991 19.5172 17.5234 19.2726 17.4859C19.028 17.4483 18.7968 17.35 18.6 17.2L17.933 16.7C17.7599 16.5702 17.5494 16.5 17.333 16.5C17.1166 16.5 16.9061 16.5702 16.733 16.7L16.467 16.9C15.9477 17.2895 15.3161 17.5 14.667 17.5C14.0179 17.5 13.3863 17.2895 12.867 16.9L12.6 16.7C12.4269 16.5702 12.2164 16.5 12 16.5C11.7836 16.5 11.5731 16.5702 11.4 16.7L11.133 16.9C10.6137 17.2895 9.98211 17.5 9.333 17.5C8.68389 17.5 8.05229 17.2895 7.533 16.9L7.267 16.7C7.0939 16.5702 6.88337 16.5 6.667 16.5C6.45063 16.5 6.2401 16.5702 6.067 16.7L5.4 17.2C5.20322 17.35 4.97196 17.4483 4.72739 17.4859C4.48282 17.5234 4.23273 17.4991 4 17.415Z"
                  fill="#2C8EE3"
                />
              </svg>
            </div>
            <h2 className="text-primaryText capitalize text-[20px] font-semibold mt-6">
              Birthday <br />
              Parties
            </h2>
            <p className="mt-2 text-sm text-black">
              Celebrate your birthday with a sporty twist.
            </p>
          </div>
          <div className="py-4 px-4 rounded-lg max-sm:pr-0 w-full group bg-lightPrimary/5 transition-all duration-300 hover:shadow-[0px_10px_20px_0px_#00000020] ">
            <div className="p-4 bg-lightPrimary w-max rounded-lg transition-all duration-300">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0001 14.4C7.32558 14.4 8.4001 13.3255 8.4001 12C8.4001 10.6745 7.32558 9.60001 6.0001 9.60001C4.67461 9.60001 3.6001 10.6745 3.6001 12C3.6001 13.3255 4.67461 14.4 6.0001 14.4Z"
                  fill="#2C8EE3"
                />
                <path
                  d="M12.0001 14.4C13.3256 14.4 14.4001 13.3255 14.4001 12C14.4001 10.6745 13.3256 9.60001 12.0001 9.60001C10.6746 9.60001 9.6001 10.6745 9.6001 12C9.6001 13.3255 10.6746 14.4 12.0001 14.4Z"
                  fill="#2C8EE3"
                />
                <path
                  d="M18.0001 14.4C19.3256 14.4 20.4001 13.3255 20.4001 12C20.4001 10.6745 19.3256 9.60001 18.0001 9.60001C16.6746 9.60001 15.6001 10.6745 15.6001 12C15.6001 13.3255 16.6746 14.4 18.0001 14.4Z"
                  fill="#2C8EE3"
                />
              </svg>
            </div>
            <h2 className="text-primaryText capitalize text-[20px] font-semibold mt-6">
              And More
            </h2>
            <p className="mt-2 text-sm text-black">
              Whatever event you have in mind, Our space is ready for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
