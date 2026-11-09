"use client";

import { useEffect, useState } from "react";

/**
 * Transparent header that gains a frosted background once the page scrolls.
 * Without JavaScript it simply stays transparent-with-blur.
 */
export default function HeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-b border-zinc-200/70 bg-white/70 shadow-sm backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/70"
          : "border-b border-transparent bg-transparent backdrop-blur-[2px]"
      }`}
    >
      {children}
    </header>
  );
}
