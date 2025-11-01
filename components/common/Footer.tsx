import { Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FooterSection() {
  return (
    <footer className="relative isolate bg-foreground text-white">
      {/* subtle grid */}
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          backgroundPosition: "-1px -1px",
        }}
      /> */}
      <div
        className="absolute w-1/2 h-1/2 left-20 -inset-6 rounded-[2.5rem] bg-emerald-400/10 blur-3xl transition-opacity duration-500"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16 md:pb-7">
        {/* top row */}
        <div className="grid justify-content-between grid-cols-1 gap-10 lg:grid-cols-4">
          {/* left: brand + newsletter */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-2">
              <Image
                src="/images/servsi_logo.svg"
                width={200}
                height={50}
                alt="logo"
                className="w-30"
              />
            </div>

            <h3 className="text-lg font-semibold">
              Restez Connecté et Informé
            </h3>
            <p className="mt-2 max-w-xl text-white/80">
              Abonnez-vous à notre newsletter pour recevoir des conseils IT, des
              tendances et des stratégies pour optimiser vos performances.
            </p>

            <form action="#" className="mt-6 flex max-w-xl items-center gap-3">
              <label htmlFor="email" className="sr-only">
                Adresse e-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl bg-white/10 px-4 py-3 text-white placeholder:text-white/60 ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="submit"
                className="whitespace-nowrap cursor-pointer md:block hidden rounded-xl bg-primary px-5 py-3 font-medium text-black shadow ring-1 ring-emerald-500/40 transition hover:brightness-95"
              >
                Recevoir les notifications
              </button>
              <button
                type="submit"
                aria-label="Recevoir les alertes"
                className="whitespace-nowrap block md:hidden rounded-xl bg-primary px-3 py-3 font-medium text-black shadow ring-1 ring-emerald-500/40 transition hover:brightness-95"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* links */}
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-10 lg:col-span-2  "
          >
            <div className="md:justify-self-end">
              <div className="text-sm font-semibold text-white/80">
                Sections
              </div>
              <ul className="mt-4 space-y-3 text-white/80">
                <li>
                  <Link href="/#services" className="hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/#work" className="hover:text-white">
                    Réalisations
                  </Link>
                </li>
                <li>
                  <Link href="/#testimonials" className="hover:text-white">
                    Témoignages
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="md:justify-self-end">
              <div className="text-sm font-semibold text-white/80">
                Information
              </div>
              <ul className="mt-4 space-y-3 text-white/80">
                <li>
                  <Link href="/#faq" className="hover:text-white">
                    FAQ&apos;s
                  </Link>
                </li>

                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* divider */}
        <hr className="mt-10 border-white/10" />

        {/* bottom row */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-white/70 md:flex-row">
          <p>Copyright © 2025 — All Right Reserved</p>
          <p className="flex  gap-2 ">
            Created by{" "}
            <Link
              href="https://www.iqubeagency.com/"
              className="hover:text-white"
              target="_blank"
            >
              <Image
                src="/iqube.png"
                width={100}
                height={100}
                alt="iqube logo"
                className="grayscale opacity-80"
              ></Image>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
