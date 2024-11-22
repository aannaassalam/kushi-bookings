import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Header from "./Header";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <Header />
      {children}
    </div>
  );
}
