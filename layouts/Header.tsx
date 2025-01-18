import assets from "@/json/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoBagOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  HStack,
  IconButton,
  useDisclosure
} from "@chakra-ui/react";
import Cart from "@/components/Cart";
import { destroyCookie, parseCookies } from "nookies";

export default function Header() {
  const cookies = parseCookies();
  const router = useRouter();
  const user = JSON.parse(cookies.user || "{}");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="py-5 px-[100px] flex flex-row justify-between items-center">
      <Image src={assets.logo} width={153} height={45} alt="logo" />
      <div className="flex flex-row items-center">
        <Link
          href="/"
          className={`  ${
            router.pathname === "/" ? "text-primary" : "text-black"
          }`}
        >
          Home
        </Link>
        <Link
          href="/"
          className={`ml-6  ${
            router.pathname === "/my-bookings" ? "text-primary" : "text-black"
          }`}
        >
          My Bookings
        </Link>
        {/* <Link
          href="/facility"
          className={` ml-6 ${
            router.pathname.includes("facility") ? "text-primary" : "text-black"
          }`}
        >
          Facility
        </Link>
        <Link
          href="/membership"
          className={` ml-6 ${
            router.pathname.includes("membership")
              ? "text-primary"
              : "text-black"
          }`}
        >
          Membership
        </Link>
        <Link
          href="/seasonPass"
          className={` ml-6 ${
            router.pathname.includes("seasonPass")
              ? "text-primary"
              : "text-black"
          }`}
        >
          Season Pass
        </Link> */}
        <IconButton
          variant="ghost"
          className="ml-2 mr-[10px]"
          onClick={onOpen}
          aria-label=""
        >
          <IoBagOutline size={20} className="text-primary" />
        </IconButton>
        {!Boolean(user.full_name) ? (
          <Button
            as={Link}
            href="/auth/login"
            className="primaryButton"
            colorScheme="primary"
          >
            Login
          </Button>
        ) : (
          <HStack className="ml-6">
            <Image
              alt="user"
              width={36}
              height={36}
              src="https://i.pravatar.cc/50?img=5"
              className="!w-[36px] !h-[36px] rounded-full"
            />
            <Box>
              <p className="font-inter text-sm font-semibold capitalize">
                {user.full_name}
              </p>
              <p
                className="font-inter !p-0 h-max text-xs text-primary capitalize font-semibold cursor-pointer"
                onClick={() => {
                  destroyCookie(null, "token");
                  destroyCookie(null, "user");
                  router.push("/auth/login");
                }}
              >
                Logout
              </p>
            </Box>
          </HStack>
        )}
      </div>
      <Cart open={isOpen} close={onClose} />
    </div>
  );
}
