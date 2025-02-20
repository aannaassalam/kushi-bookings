import About from "@/components/Homepage/About";
import Benefits from "@/components/Homepage/Benefits";
import HeroSection from "@/components/Homepage/HeroSection";
// import PackageDetails from "@/components/Homepage/Package";
// import SeasonPass from "@/components/Homepage/SeasonPass";
import WhyUs from "@/components/Homepage/WhyUs";
import Quote from "@/components/Quote/Quote";
import AppLayout from "@/layouts/AppLayout";

export default function Home() {
  return (
    <AppLayout>
      <HeroSection />
      <Benefits />
      {/* <PackageDetails /> */}
      <About />
      <WhyUs />
      {/* <Quote /> */}

      {/* <SeasonPass /> */}
    </AppLayout>
  );
}
