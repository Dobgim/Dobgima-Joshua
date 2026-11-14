import Link from "next/link";
import { FULL_NAME } from "@/lib/config";
import HeaderShell from "./HeaderShell";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import { getApprovedReviews } from "@/lib/reviews";

const nav = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default async function Header() {
  // Reviews only appear in the menu once at least one real review is approved.
  const hasReviews = (await getApprovedReviews()).length > 0;
  const items = hasReviews ? nav : nav.filter((n) => n.href !== "/reviews");
  return (
    <HeaderShell>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link
          href="/"
          className="min-w-0 truncate text-[15px] font-semibold tracking-tight text-zinc-900 transition-colors hover:text-sky-700 sm:text-base dark:text-zinc-100 dark:hover:text-sky-400"
        >
          {FULL_NAME}
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="flex items-center gap-1 text-sm">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="nav-link relative rounded-md px-3 py-2 text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
          <MobileMenu showReviews={hasReviews} />
        </div>
      </div>
    </HeaderShell>
  );
}
