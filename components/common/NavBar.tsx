"use client";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

export type NavLink = { label: string; href: string };

const montserrat = Montserrat({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

type Props = {
  links?: NavLink[];
  cta?: { label: string; href: string };
};

export default function Navbar({
  links = [
    { label: "Vérifier", href: "/verify" },
    { label: "Signaler", href: "/report" },
    { label: "API & Docs", href: "/docs" },
    { label: "À propos", href: "/about" },
    { label: "Blog", href: "/blog" },
  ],
  cta = { label: "Vérifier maintenant", href: "/verify" },
}: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href) || false;

  return (
    <header
      className={`${montserrat.variable} sticky top-0 z-50 w-full bg-foreground text-white`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/shield-qc.png" /* place your shield file in /public/images/ */
            width={36}
            height={36}
            alt="SecuriQC logo"
            className="h-9 w-9"
            priority
          />
          <span className="sr-only md:not-sr-only md:inline text-sm font-semibold tracking-wide">
            SecuriQC
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <ul className="flex items-center gap-8 text-sm text-white/80">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded px-1 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 ${
                      active ? "text-white" : "hover:text-white"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* CTA (desktop) */}
        <div className="hidden md:block">
          <Link
            href={cta.href}
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-semibold text-black shadow ring-1 ring-emerald-500/40 transition hover:brightness-95"
          >
            {cta.label}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-white/80 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle menu</span>
          {/* icon */}
          <svg
            className={`h-5 w-5 ${open ? "hidden" : "block"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
          <svg
            className={`h-5 w-5 ${open ? "block" : "hidden"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden ${
          open ? "block" : "hidden"
        } border-t border-white/10 bg-foreground`}
      >
        <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-white/90">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`block cursor-pointer rounded-md px-3 py-2 text-center hover:bg-white/5 ${
                    active ? "text-white" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li className="mt-2">
            <Link
              href={cta.href}
              className="mx-auto block w-2/3 cursor-pointer items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-black shadow ring-1 ring-emerald-500/40"
              onClick={() => setOpen(false)}
            >
              {cta.label}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
