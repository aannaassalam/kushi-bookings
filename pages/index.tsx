import About from "@/components/Homepage/About";
import Benefits from "@/components/Homepage/Benefits";
import HeroSection from "@/components/Homepage/HeroSection";
import Sponsored from "@/components/Homepage/Sponsored";
// import PackageDetails from "@/components/Homepage/Package";
// import SeasonPass from "@/components/Homepage/SeasonPass";
import WhyUs from "@/components/Homepage/WhyUs";
import AppLayout from "@/layouts/AppLayout";
import { getTimezone } from "@/lib/functions/_helpers.lib";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    alert(getTimezone());
  }, []);
  return (
    <AppLayout>
      <HeroSection />
      <Sponsored />
      <Benefits />
      <About />
      <WhyUs />
    </AppLayout>
  );
}
