import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import {
  EMAIL,
  FULL_NAME,
  LOCATIONS_LABEL,
  PHONE_DISPLAY,
  PROFILES,
  WHATSAPP_URL,
} from "@/lib/config";

const description = `Contact ${FULL_NAME}, software engineer in ${LOCATIONS_LABEL}. Reach him on WhatsApp, by email, LinkedIn or Upwork, for freelance and remote work.`;

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: `Contact ${FULL_NAME}`, description, url: "/contact" },
};

const channels: { label: string; href: string; detail: string }[] = [
  { label: "WhatsApp (fastest)", href: WHATSAPP_URL, detail: PHONE_DISPLAY },
  { label: "Email", href: `mailto:${EMAIL}`, detail: EMAIL },
  {
    label: "LinkedIn",
    href: PROFILES.linkedin,
    detail: "linkedin.com/in/dobgima-joshua-2291a7301",
  },
  {
    label: "Upwork",
    href: PROFILES.upwork,
    detail: "Hire me on Upwork",
  },
  {
    label: "GitHub",
    href: PROFILES.github1,
    detail: "github.com/dobgimajoshua",
  },
  {
    label: "GitHub (second account)",
    href: PROFILES.github2,
    detail: "github.com/Dobgim",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ type: "ContactPage", path: "/contact", name: `Contact ${FULL_NAME}`, description })} />
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        Contact {FULL_NAME}
      </h1>
      <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
        I&apos;m available for freelance and remote work on web and mobile
        projects, working from {LOCATIONS_LABEL}. The fastest way to reach me is
        WhatsApp.
      </p>
      <ul data-reveal-group className="mt-8 max-w-xl space-y-4">
        {channels.map((channel) => (
          <li
            key={channel.label}
            data-reveal
            className="lift rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
          >
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {channel.label}
            </p>
            <a
              href={channel.href}
              rel="me noopener"
              className="mt-0.5 inline-block font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
            >
              {channel.detail}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        Not sure yet? Read{" "}
        <Link
          href="/about"
          className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
        >
          about me
        </Link>{" "}
        or browse{" "}
        <Link
          href="/projects"
          className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
        >
          my projects
        </Link>
        .
      </p>
    </>
  );
}
