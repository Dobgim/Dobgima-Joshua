import Link from "next/link";
import { EMAIL, FULL_NAME, PROFILES } from "@/lib/config";

const profileLinks: { href: string; label: string }[] = [
  { href: PROFILES.github1, label: "GitHub (dobgimajoshua)" },
  { href: PROFILES.github2, label: "GitHub (Dobgim)" },
  { href: PROFILES.linkedin, label: "LinkedIn" },
  { href: PROFILES.upwork, label: "Upwork" },
  ...(PROFILES.whatsapp
    ? [{ href: PROFILES.whatsapp, label: "WhatsApp" }]
    : []),
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <p className="font-semibold text-zinc-900 dark:text-zinc-100">
          {FULL_NAME}
        </p>
        <p className="mt-1 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
          Software engineer in Buea, Cameroon, building web, mobile and AI
          products with Next.js, Flutter, Supabase and Firebase. Founder of
          MotorWise.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {profileLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                rel="me noopener"
                className="text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${EMAIL}`}
              className="text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
            >
              {EMAIL}
            </a>
          </li>
        </ul>
        <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-500">
          © {new Date().getFullYear()} {FULL_NAME} ·{" "}
          <Link href="/about" className="underline-offset-4 hover:underline">
            About
          </Link>{" "}
          ·{" "}
          <Link href="/contact" className="underline-offset-4 hover:underline">
            Contact
          </Link>
        </p>
      </div>
    </footer>
  );
}
