import About from "@/components/Homepage/About";
import Benefits from "@/components/Homepage/Benefits";
import HeroSection from "@/components/Homepage/HeroSection";
import PackageDetails from "@/components/Homepage/Package";
import SeasonPass from "@/components/Homepage/SeasonPass";
import assets from "@/json/assets";
import AppLayout from "@/layouts/AppLayout";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <AppLayout>
      <HeroSection />
      <Benefits />
      <PackageDetails />
      <About />
      <SeasonPass />
    </AppLayout>
  );
}
