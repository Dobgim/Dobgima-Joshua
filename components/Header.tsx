import Link from "next/link";
import { FULL_NAME } from "@/lib/config";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

const nav = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link
          href="/"
          className="min-w-0 truncate text-[15px] font-semibold tracking-tight sm:text-base text-zinc-900 hover:text-sky-700 dark:text-zinc-100 dark:hover:text-sky-400"
        >
          {FULL_NAME}
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="flex items-center gap-2 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-md px-2 py-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
