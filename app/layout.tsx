import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/NavBar";
import FooterSection from "@/components/common/Footer";
import Providers from "./providers";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "700"], // Example weights
  subsets: ["latin"],
  display: "swap", // Optimizes font loading
  variable: "--font-montserrat", // Optional: for CSS variables
});

export const metadata: Metadata = {
  title: "SERVSI - Solutions IT fiables pour votre entreprise",
  description:
    "De l’infrastructure réseau à la cybersécurité avancée, SERVSI accompagne la transformation digitale en Algérie avec des solutions IT innovantes, durables et sécurisées. En partenariat avec IT2S, nous offrons agilité, expertise et proximité pour bâtir un environnement numérique performant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable}`}>
        <Providers>
          <Navbar></Navbar>
          {children}
          <FooterSection />
        </Providers>
      </body>
    </html>
  );
}
