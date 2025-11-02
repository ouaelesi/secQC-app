import Image from "next/image";

import { Montserrat } from "next/font/google";
import HeroSection from "@/components/homePage/Header";
import QuickSearchSection from "@/components/homePage/QuickSearchWidget";
import ServicesAudienceSection from "@/components/homePage/ServicesAudienceSection";
import PartnersSlider from "@/components/homePage/PartnerSlider";
import PartnersSection from "@/components/homePage/PartnersSection";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "700"], // Example weights
  subsets: ["latin"],
  display: "swap", // Optimizes font loading
  variable: "--font-montserrat", // Optional: for CSS variables
});

export default function Home() {
  return (
    <div className={montserrat.className}>
      <HeroSection />
      <ServicesAudienceSection />
      <QuickSearchSection></QuickSearchSection>
      <PartnersSection />
    </div>
  );
}
