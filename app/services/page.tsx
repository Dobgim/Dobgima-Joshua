import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import ServiceIcon from "@/components/ServiceIcon";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { FULL_NAME, LOCATIONS_LABEL, SITE_UPDATED, WHATSAPP_URL } from "@/lib/config";
import { faqPageSchema, servicesSchema, webPageSchema } from "@/lib/schema";
import { services, workProcess } from "@/lib/services";
import { servicesFaq } from "@/lib/services-faq";

const title = "Websites, mobile apps and AI automation";
const description = `Why businesses need a website, a mobile app and AI automation, and how ${FULL_NAME}, a software engineer in ${LOCATIONS_LABEL}, builds them.`;

export const metadata: Metadata = {
  title: "Services: websites, mobile apps and AI",
  description,
  alternates: { canonical: "/services" },
  openGraph: { title: `${title} | ${FULL_NAME}`, description, url: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ path: "/services", name: title, description }),
          ...servicesSchema(),
          faqPageSchema(servicesFaq, "/services"),
        ]}
      />
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />

      {/* Intro */}
      <header className="max-w-3xl">
        <p className="text-base font-semibold text-sky-700 dark:text-sky-400">Services</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
          What I build, and why it matters for your business
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          I build three things: websites that help customers find and trust you,
          mobile apps that keep you on their phones, and AI automation that saves
          your team time. Each one solves a real business problem. Here is why,
          and exactly what you get.
        </p>
        <nav aria-label="Services on this page" className="mt-8 flex flex-wrap gap-3">
          {services.map((svc) => (
            <a
              key={svc.slug}
              href={`#${svc.slug}`}
              className="btn-lift inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-800 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
            >
              <ServiceIcon icon={svc.icon} className="h-4 w-4 text-sky-700 dark:text-sky-400" />
              {svc.name}
            </a>
          ))}
        </nav>
      </header>

      {/* Each service */}
      {services.map((svc, i) => (
        <section
          key={svc.slug}
          id={svc.slug}
          aria-labelledby={`${svc.slug}-heading`}
          className="scroll-mt-24 border-t border-zinc-200 py-16 first-of-type:mt-14 dark:border-zinc-800"
        >
          <div data-reveal className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-400">
              <ServiceIcon icon={svc.icon} />
            </span>
            <div>
              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">0{i + 1}</p>
              <h2 id={`${svc.slug}-heading`} className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
                {svc.name}
              </h2>
            </div>
          </div>

          {/* Direct answer: the sentence answer engines quote */}
          <div data-reveal className="mt-8 max-w-3xl rounded-2xl bg-zinc-50 p-6 dark:bg-zinc-900">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">In short</p>
            <p className="mt-2 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">{svc.answer}</p>
          </div>

          <h3 className="mt-12 text-xl font-semibold text-zinc-950 dark:text-white">Why it matters</h3>
          <div data-reveal-group className="mt-6 grid gap-5 sm:grid-cols-2">
            {svc.why.map((w) => (
              <article
                key={w.title}
                data-reveal
                className="lift rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h4 className="font-semibold text-zinc-950 dark:text-white">{w.title}</h4>
                <p className="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-400">{w.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div data-reveal>
              <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">What you get</h3>
              <ul className="mt-5 space-y-3">
                {svc.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 text-zinc-700 dark:text-zinc-300">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 h-4 w-4 shrink-0 text-sky-700 dark:text-sky-400">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal>
              <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">Built with</h3>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                {svc.stack.map((t) => (
                  <li key={t} className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    {t}
                  </li>
                ))}
              </ul>
              {svc.example && (
                <p className="mt-6 text-zinc-600 dark:text-zinc-400">
                  Example:{" "}
                  <Link href={svc.example.href} className="link-draw font-semibold text-sky-700 dark:text-sky-400">
                    {svc.example.label}
                  </Link>
                </p>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Process */}
      <section aria-labelledby="process-heading" className="border-t border-zinc-200 py-16 dark:border-zinc-800">
        <h2 id="process-heading" data-reveal className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
          How we work together
        </h2>
        <ol data-reveal-group className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {workProcess.map((step, i) => (
            <li key={step.title} data-reveal className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950 text-sm font-bold text-white dark:bg-white dark:text-zinc-950">
                {i + 1}
              </span>
              <h3 className="mt-4 font-semibold text-zinc-950 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Questions */}
      <section aria-labelledby="questions-heading" className="border-t border-zinc-200 py-16 dark:border-zinc-800">
        <h2 id="questions-heading" data-reveal className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
          Common questions
        </h2>
        <dl data-reveal-group className="mt-10 max-w-3xl space-y-8">
          {servicesFaq.map((item) => (
            <div key={item.question} data-reveal>
              <dt className="text-lg font-semibold text-zinc-950 dark:text-white">{item.question}</dt>
              <dd className="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-400">{item.answer}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-sm text-zinc-500 dark:text-zinc-400">
          More answers on the{" "}
          <Link href="/faq" className="link-draw font-semibold text-sky-700 dark:text-sky-400">FAQ page</Link>{" "}
          and{" "}
          <Link href="/about" className="link-draw font-semibold text-sky-700 dark:text-sky-400">about {FULL_NAME}</Link>.
          Last updated <time dateTime={SITE_UPDATED}>{SITE_UPDATED}</time>.
        </p>
      </section>

      {/* CTA */}
      <section data-reveal aria-labelledby="start-heading" className="rounded-3xl bg-zinc-950 px-6 py-14 text-center text-white sm:px-12 dark:bg-zinc-900">
        <h2 id="start-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">Not sure which one you need?</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-300">
          Tell me about your business and I will recommend the simplest solution that gets results.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener"
          className="btn-lift mt-8 inline-flex items-center gap-3 rounded-lg bg-[#25D366] px-7 py-3.5 font-semibold text-white hover:bg-[#1ebe5a]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Talk to me on WhatsApp
        </a>
      </section>
    </>
  );
}
