import Link from "next/link";

/**
 * Hamburger menu for small screens. Built on <details>/<summary> so it opens
 * and closes without any JavaScript — consistent with the no-JS-readable site.
 */
const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function MobileMenu() {
  return (
    <details className="relative md:hidden">
      <summary
        aria-label="Open menu"
        className="flex cursor-pointer list-none items-center rounded-md border border-zinc-300 p-2 text-zinc-600 transition-colors hover:bg-zinc-100 [&::-webkit-details-marker]:hidden dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="h-4 w-4"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>
      <nav
        aria-label="Mobile navigation"
        className="absolute right-0 top-full z-50 mt-2 w-44 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
      >
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
