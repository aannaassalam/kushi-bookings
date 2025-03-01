import { Box, Circle, IconButton, useDisclosure } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Header from "./Header";
import Quote from "@/components/Quote/Quote";
import Footer from "./Footer";
import { IoBagOutline } from "react-icons/io5";
import Cart from "@/components/Cart";
import { useCartContext } from "@/pages/_app";

export default function AppLayout({ children }: { children: ReactNode }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { cart } = useCartContext();

  return (
    <div className="">
      <Header />
      <Box
        className="fixed bottom-10 right-10 z-40 max-md:bottom-5 max-md:right-5 floatingIcon bg-primary w-16 h-16 px-[18px] flex justify-center items-center !rounded-full cursor-pointer "
        onClick={onOpen}
      >
        <IoBagOutline size={30} className="text-white -mt-1" />
        {cart?.lanes?.length && (
          <Circle className="bg-[#fec300] absolute -top-0.5 -right-0.5 text-gray-600 h-5 w-5 flex items-center justify-center font-bold text-xs">
            {cart?.lanes.length}
          </Circle>
        )}
      </Box>
      {children}
      <Quote />
      <Footer />
      <Cart open={isOpen} close={onClose} />
    </div>
  );
}
