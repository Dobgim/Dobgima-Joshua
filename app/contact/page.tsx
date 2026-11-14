import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnquiryForm from "@/components/EnquiryForm";
import JsonLd from "@/components/JsonLd";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { webPageSchema } from "@/lib/schema";
import { workProcess } from "@/lib/services";
import {
  EMAIL,
  FULL_NAME,
  LOCATIONS_LABEL,
  PHONE_DISPLAY,
  PROFILES,
  WHATSAPP_URL,
} from "@/lib/config";

const description = `Contact ${FULL_NAME}, software engineer in Buea and Yaoundé, Cameroon. Send a project enquiry or message on WhatsApp or email.`;

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: `Contact ${FULL_NAME}`, description, url: "/contact" },
};

const channels: { label: string; href: string; detail: string }[] = [
  { label: "Email", href: `mailto:${EMAIL}`, detail: EMAIL },
  { label: "LinkedIn", href: PROFILES.linkedin, detail: "linkedin.com/in/dobgima-joshua-2291a7301" },
  { label: "Upwork", href: PROFILES.upwork, detail: "Hire me on Upwork" },
  { label: "GitHub", href: PROFILES.github1, detail: "github.com/dobgimajoshua" },
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
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-400">Contact</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
        Tell me about your project
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        I help small and medium-sized businesses build professional websites and
        web applications, and I also take on mobile app and AI automation
        projects. I work from {LOCATIONS_LABEL} with clients anywhere.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        {/* Enquiry form */}
        <section id="enquiry" aria-labelledby="enquiry-heading" className="scroll-mt-24 lg:col-span-7">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 id="enquiry-heading" className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              Project enquiry
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              A few details help me understand what you need and reply with a
              useful next step.
            </p>
            <div className="mt-6">
              <EnquiryForm whatsappUrl={WHATSAPP_URL} />
            </div>
          </div>
        </section>

        {/* Other ways + what happens next */}
        <aside className="space-y-10 lg:col-span-5">
          <div>
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">Prefer to chat?</h2>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              className="btn-lift mt-4 flex items-center gap-4 rounded-2xl bg-[#25D366] p-5 text-white hover:bg-[#1ebe5a]"
            >
              <WhatsAppIcon className="h-8 w-8 shrink-0" />
              <span>
                <span className="block font-semibold">Message me on WhatsApp</span>
                <span className="block text-sm text-white/90">{PHONE_DISPLAY}</span>
              </span>
            </a>
            <ul className="mt-4 space-y-3">
              {channels.map((channel) => (
                <li key={channel.label} className="flex items-baseline justify-between gap-4 border-b border-zinc-200 pb-3 text-sm dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">{channel.label}</span>
                  <a
                    href={channel.href}
                    rel="me noopener"
                    className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
                  >
                    {channel.detail}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">What happens next</h2>
            <ol className="mt-4 space-y-4">
              {workProcess.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-sm font-bold text-white dark:bg-white dark:text-zinc-950">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-semibold text-zinc-950 dark:text-white">{step.title}</span>
                    <span className="block text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{step.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Want to see my work first? Browse{" "}
            <Link href="/projects" className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400">
              my projects
            </Link>{" "}
            or read{" "}
            <Link href="/about" className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400">
              about me
            </Link>
            .
          </p>
        </aside>
      </div>
    </>
  );
}
