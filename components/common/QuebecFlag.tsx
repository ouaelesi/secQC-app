"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

export default function QuebecFlag() {
  const { resolvedTheme } = useTheme();
  return (
    <div>
      <div className="absolute w-full ">
        <Image
          src="/images/quebec.jpg"
          alt="Background pattern"
          className={`w-full  ${
            resolvedTheme == "dark" ? "opacity-15 grayscale" : "opacity-20"
          } `}
          width={1500}
          height={1000}
          priority
        />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-transparent   to-foreground" />
      </div>
    </div>
  );
}
