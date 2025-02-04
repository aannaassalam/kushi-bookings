import assets from "@/json/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoBagOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import Cart from "@/components/Cart";
import { destroyCookie, parseCookies } from "nookies";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const cookies = parseCookies();
  const router = useRouter();
  const user = JSON.parse(cookies.user || "{}");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mobileNav = useDisclosure();

  return (
    <div className="py-5 px-[100px] flex flex-row justify-between items-center max-lg:px-[40px] max-md:px-[20px] max-md:py-3">
      <HStack alignItems="center">
        <Button
          aria-label={mobileNav.isOpen ? "Close menu" : "Open menu"}
          display={{ base: "inline-flex", md: "none" }}
          onClick={mobileNav.onToggle}
          variant="ghost"
          pl={0}
          pr={0}
        >
          {mobileNav.isOpen ? <FiX fontSize={24} /> : <FiMenu fontSize={24} />}
        </Button>
        <Link href="/">
          <Image
            src={assets.logo}
            width={153}
            height={45}
            alt="logo"
            className="max-md:h-[30px] max-md:w-[100px]"
          />
        </Link>
      </HStack>

      <div className="flex flex-row items-center ">
        <Link
          href="/"
          className={`max-md:hidden  ${
            router.pathname === "/" ? "text-primary" : "text-black"
          }`}
        >
          Home
        </Link>
        <Link
          href="/my-bookings"
          className={`ml-6 max-md:hidden ${
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
          <HStack className="ml-0">
            <Link href="/profile">
              <Image
                alt="user"
                width={36}
                height={36}
                src={user.profile_photo ?? assets.default_user}
                className="!w-[36px] !h-[36px] rounded-full"
              />
            </Link>
            <Box>
              <Link href="/profile">
                <p className="font-inter text-sm font-semibold capitalize">
                  {user.full_name}
                </p>
              </Link>
              <p
                className="font-inter !p-0 h-max text-xs text-primary capitalize font-semibold cursor-pointer"
                onClick={() => {
                  destroyCookie(null, "token", {
                    path: "/"
                  });
                  destroyCookie(null, "user", {
                    path: "/"
                  });
                  router.push("/auth/login");
                }}
              >
                Logout
              </p>
            </Box>
          </HStack>
        )}
      </div>
      <Drawer {...mobileNav} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <DrawerCloseButton className="mt-2" size="lg" />
          </DrawerHeader>
          <DrawerBody fontSize="md">
            <VStack className="!items-start mt-4">
              <Link
                href="/"
                className={` text-lg my-1 ${
                  router.pathname === "/" ? "text-primary" : "text-black"
                }`}
              >
                Home
              </Link>
              <Link
                href="/my-bookings"
                className={` text-lg my-1 ${
                  router.pathname === "/my-bookings"
                    ? "text-primary"
                    : "text-black"
                }`}
              >
                My Bookings
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Cart open={isOpen} close={onClose} />
    </div>
  );
}
