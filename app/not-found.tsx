import Link from "next/link";
import { FULL_NAME } from "@/lib/config";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-sky-700 dark:text-sky-400">
        404
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-zinc-600 dark:text-zinc-400">
        This page doesn&apos;t exist on {FULL_NAME}&apos;s site. Try one of
        these instead:
      </p>
      <ul className="mt-6 flex flex-wrap justify-center gap-4 text-sm font-medium">
        {[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { href: "/projects", label: "Projects" },
          { href: "/blog", label: "Blog" },
          { href: "/contact", label: "Contact" },
        ].map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
