import Image from "next/image";

import { Montserrat } from "next/font/google";
import HeroSection from "@/components/homePage/Header";
import QuickSearchWidget from "@/components/homePage/QuickSearchWidget";
import ServicesAudienceSection from "@/components/homePage/ServicesAudienceSection";

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
      <QuickSearchWidget></QuickSearchWidget>
    </div>
  );
}
