import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Header from "./Header";
import Quote from "@/components/Quote/Quote";
import Footer from "./Footer";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <Header />
      {children}
      <Quote />
      {/* <Footer /> */}
    </div>
  );
}
