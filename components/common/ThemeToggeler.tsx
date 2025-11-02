"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  console.log(resolvedTheme);
  if (!mounted) {
    // Avoid hydration mismatch
    return (
      <button
        aria-label="Toggle dark mode"
        className={`rounded-md p-2 text-white/80 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 ${className}`}
      >
        {/* placeholder icon */}
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="4" />
        </svg>
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";
  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`rounded-md p-2 text-text/80 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 ${className}`}
      title={isDark ? "Switch to light" : "Switch to dark"}
    >
      
      {/* Sun / Moon icons (no external lib needed) */}
      {isDark ? (
        // Sun
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364-1.414 1.414M8.05 16.95l-1.414 1.414m12.728 0-1.414-1.414M8.05 7.05 6.636 5.636" />
        </svg>
      ) : (
        // Moon
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
