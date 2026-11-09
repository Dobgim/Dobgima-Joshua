import Link from "next/link";
import {
  EMAIL,
  FULL_NAME,
  LOCATIONS_LABEL,
  PHONE_DISPLAY,
  PROFILES,
  WHATSAPP_URL,
} from "@/lib/config";

const profileLinks: { href: string; label: string }[] = [
  { href: PROFILES.github1, label: "GitHub (dobgimajoshua)" },
  { href: PROFILES.github2, label: "GitHub (Dobgim)" },
  { href: PROFILES.linkedin, label: "LinkedIn" },
  { href: PROFILES.upwork, label: "Upwork" },
];

const linkClass =
  "text-zinc-600 underline-offset-4 transition-colors hover:text-sky-700 hover:underline dark:text-zinc-400 dark:hover:text-sky-400";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="mx-auto max-w-6xl px-4 py-12 text-center">
        <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{FULL_NAME}</p>
        <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
          Software engineer in {LOCATIONS_LABEL}, building fast, reliable web and
          mobile products with Next.js, Flutter, Supabase and Firebase. Founder of
          MotorWise.
        </p>
        <ul className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {profileLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} rel="me noopener" className={linkClass}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href={WHATSAPP_URL} rel="noopener" className={linkClass}>
              WhatsApp {PHONE_DISPLAY}
            </a>
          </li>
          <li>
            <a href={`mailto:${EMAIL}`} className={linkClass}>
              {EMAIL}
            </a>
          </li>
        </ul>
        <p className="mt-8 text-xs text-zinc-500">
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
