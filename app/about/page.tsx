import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import {
  BIRTH_DATE_DISPLAY,
  DEFINITION_SENTENCE,
  EDUCATION,
  EMAIL,
  EMPLOYER,
  FULL_NAME,
  KNOWS_ABOUT,
  LOCATIONS_LABEL,
  PHONE_DISPLAY,
  SECONDARY_SCHOOL,
  SITE_UPDATED,
  WHATSAPP_URL,
} from "@/lib/config";
import { projects } from "@/lib/projects";
import { services } from "@/lib/services";
import { profilePageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `About ${FULL_NAME}`,
  description: DEFINITION_SENTENCE,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About ${FULL_NAME}`,
    description: DEFINITION_SENTENCE,
    url: "/about",
  },
};

const journey = [
  {
    label: BIRTH_DATE_DISPLAY,
    title: "Born in Cameroon",
    body: `${FULL_NAME} was born on ${BIRTH_DATE_DISPLAY}.`,
  },
  {
    label: String(SECONDARY_SCHOOL.completed),
    title: "Completed secondary school",
    body: `Finished high school at ${SECONDARY_SCHOOL.name}, ${SECONDARY_SCHOOL.city}, and set out to pursue a career in software engineering.`,
  },
  {
    label: "Education",
    title: EDUCATION.degree,
    body: `Studied software engineering at ${EDUCATION.school} in ${EDUCATION.city} and began turning ideas into working products.`,
  },
  {
    label: "Founder",
    title: "Founded Home237",
    body: "Built Home237, a property rental platform that helps people in Cameroon find and list rental homes online.",
    href: "/projects/home237",
  },
  {
    label: "Founder",
    title: "Founded MotorWise",
    body: "Built MotorWise, an AI vehicle maintenance platform for fleet operators, as a secure multi-tenant SaaS.",
    href: "/projects/motorwise",
  },
  {
    label: "Today",
    title: "Building for businesses",
    body: `Works as ${EMPLOYER.role.replace("Remote", "remote")} at ${EMPLOYER.name}, co-builds the EdTech startup WeLearn, and builds websites, mobile apps and AI automation for clients.`,
  },
];

const principles = [
  {
    title: "Built for real people",
    body: "Every project starts with the people who will use it, so the result is simple, clear and useful from day one.",
  },
  {
    title: "Fast on everyday phones",
    body: "Most customers browse on mobile, often on mobile data. I build pages and apps that load quickly and work on real networks.",
  },
  {
    title: "Secure and dependable",
    body: "Data is protected properly, from database rules to sign-in, so your business and your customers can trust what you run.",
  },
  {
    title: "Clear communication",
    body: "You get honest advice, regular progress updates and working previews, so you always know where your project stands.",
  },
];

const heading = "text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-white";
const eyebrow = "text-sm font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-400";

export default function AboutPage() {
  const facts: [string, string][] = [
    ["Full name", FULL_NAME],
    ["Nationality", "Cameroonian"],
    ["Born", BIRTH_DATE_DISPLAY],
    ["Profession", "Software Engineer"],
    ["Based in", LOCATIONS_LABEL],
    ["Higher education", `${EDUCATION.degree}, ${EDUCATION.school}`],
    ["Secondary school", `${SECONDARY_SCHOOL.name}, ${SECONDARY_SCHOOL.city} (${SECONDARY_SCHOOL.completed})`],
    ["Founder of", "MotorWise and Home237"],
    ["Works at", `${EMPLOYER.name} (${EMPLOYER.role.replace("Remote", "remote")})`],
    ["Services", services.map((s) => s.name).join(", ")],
    ["Core stack", "Next.js, TypeScript, React, Flutter, Supabase, Firebase"],
    ["Contact", `WhatsApp ${PHONE_DISPLAY} · ${EMAIL}`],
  ];

  return (
    <>
      <JsonLd data={profilePageSchema()} />
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      {/* ───────── Intro ───────── */}
      <section className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className={eyebrow}>About</p>
          <h1 className="mt-3 text-4xl font-bold leading-[1.08] tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
            About {FULL_NAME}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zinc-700 sm:text-xl dark:text-zinc-300">
            {DEFINITION_SENTENCE}
          </p>
          <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
            He is also the founder of Home237, a property rental platform for
            Cameroon, and works with businesses in {LOCATIONS_LABEL} and
            internationally.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              className="btn-lift inline-flex items-center justify-center gap-3 rounded-lg bg-zinc-950 px-6 py-3.5 font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366] text-white">
                <WhatsAppIcon className="h-3.5 w-3.5" />
              </span>
              Work with me
            </a>
            <Link
              href="/projects"
              className="btn-lift inline-flex items-center justify-center rounded-lg border border-zinc-300 px-6 py-3.5 font-semibold text-zinc-800 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-100"
            >
              See my projects
            </Link>
          </div>
        </div>
        <div className="flex justify-center lg:col-span-5 lg:justify-end">
          <div className="relative w-64 sm:w-80">
            <span
              aria-hidden="true"
              className="absolute bottom-[8%] left-1/2 aspect-square w-[88%] -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-100 to-sky-50/0 dark:from-zinc-200 dark:to-zinc-200/0"
            />
            <picture className="relative block">
              <source srcSet="/dobgima-joshua-foncham-portrait.webp" type="image/webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/dobgima-joshua-foncham-portrait.png"
                alt="Dobgima Joshua Foncham, software engineer"
                width={720}
                height={680}
                className="relative h-auto w-full"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* ───────── Story ───────── */}
      <section data-reveal aria-labelledby="story-heading" className="mt-20 border-t border-zinc-200 pt-16 dark:border-zinc-800">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className={eyebrow}>My story</p>
            <h2 id="story-heading" className={`mt-3 ${heading}`}>
              From Douala to building products people use
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-zinc-700 lg:col-span-8 dark:text-zinc-300">
            <p>
              My name is {FULL_NAME}. I am a Cameroonian software engineer, born
              on {BIRTH_DATE_DISPLAY}.
            </p>
            <p>
              In {SECONDARY_SCHOOL.completed} I completed secondary school at{" "}
              {SECONDARY_SCHOOL.name} in {SECONDARY_SCHOOL.city}, and I set out to
              pursue my dream of building software. I studied software
              engineering at {EDUCATION.school} in {EDUCATION.city}, where I earned
              my {EDUCATION.degree}, and began turning ideas into real products.
            </p>
            <p>
              That path led me to found{" "}
              <Link href="/projects/home237" className="link-draw font-semibold text-sky-700 dark:text-sky-400">Home237</Link>,
              a property rental platform for Cameroon, and{" "}
              <Link href="/projects/motorwise" className="link-draw font-semibold text-sky-700 dark:text-sky-400">MotorWise</Link>,
              an AI vehicle maintenance platform for fleet operators. Alongside my
              own products, I work as {EMPLOYER.role.replace("Remote", "remote")} at {EMPLOYER.name},
              an Africa-to-Japan education and travel consultancy, and I build
              websites, mobile apps and AI automation for businesses.
            </p>
            <p>
              I believe good software should be simple to use, fast on everyday
              phones and dependable. Every project I take on starts with one
              question: what will genuinely help the people who use it?
            </p>
          </div>
        </div>
      </section>

      {/* ───────── Journey ───────── */}
      <section data-reveal aria-labelledby="journey-heading" className="mt-20">
        <p className={eyebrow}>My journey</p>
        <h2 id="journey-heading" className={`mt-3 ${heading}`}>Milestones</h2>
        <ol data-reveal-group className="relative mt-10 space-y-8 border-l border-zinc-200 pl-8 dark:border-zinc-800">
          {journey.map((step) => (
            <li key={step.title} data-reveal className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[2.45rem] top-1.5 h-4 w-4 rounded-full border-4 border-white bg-sky-700 ring-1 ring-zinc-200 dark:border-zinc-950 dark:bg-sky-400 dark:ring-zinc-800"
              />
              <p className="text-sm font-semibold text-sky-700 dark:text-sky-400">{step.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-zinc-950 dark:text-white">
                {step.href ? (
                  <Link href={step.href} className="hover:text-sky-700 dark:hover:text-sky-400">
                    {step.title}
                  </Link>
                ) : (
                  step.title
                )}
              </h3>
              <p className="mt-1 max-w-2xl leading-relaxed text-zinc-600 dark:text-zinc-400">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ───────── Principles ───────── */}
      <section data-reveal aria-labelledby="principles-heading" className="mt-20">
        <p className={eyebrow}>How I work</p>
        <h2 id="principles-heading" className={`mt-3 ${heading}`}>What you can expect</h2>
        <div data-reveal-group className="mt-10 grid gap-5 sm:grid-cols-2">
          {principles.map((p, i) => (
            <article
              key={p.title}
              data-reveal
              className="lift rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="text-sm font-semibold text-zinc-400">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold text-zinc-950 dark:text-white">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-400">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ───────── Key facts ───────── */}
      <section data-reveal aria-labelledby="facts-heading" className="mt-20">
        <p className={eyebrow}>At a glance</p>
        <h2 id="facts-heading" className={`mt-3 ${heading}`}>Key facts about {FULL_NAME}</h2>
        <dl className="mt-8 grid overflow-hidden rounded-2xl border border-zinc-200 sm:grid-cols-2 dark:border-zinc-800">
          {facts.map(([term, value]) => (
            <div key={term} className="border-b border-zinc-200 px-5 py-4 sm:odd:border-r dark:border-zinc-800">
              <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{term}</dt>
              <dd className="mt-1 text-zinc-800 dark:text-zinc-200">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          Last updated <time dateTime={SITE_UPDATED}>{SITE_UPDATED}</time>
        </p>
      </section>

      {/* ───────── Skills ───────── */}
      <section data-reveal aria-labelledby="skills-heading" className="mt-20">
        <p className={eyebrow}>Expertise</p>
        <h2 id="skills-heading" className={`mt-3 ${heading}`}>Skills and technologies</h2>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
          {KNOWS_ABOUT.map((skill) => (
            <li key={skill} className="rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              {skill}
            </li>
          ))}
        </ul>
      </section>

      {/* ───────── Work ───────── */}
      <section data-reveal aria-labelledby="work-heading" className="mt-20">
        <p className={eyebrow}>Selected work</p>
        <h2 id="work-heading" className={`mt-3 ${heading}`}>Projects</h2>
        <ul data-reveal-group className="mt-8 grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug} data-reveal>
              <Link
                href={`/projects/${project.slug}`}
                className="lift group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold text-zinc-950 group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-400">
                    {project.name}
                  </span>
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {project.role}
                  </span>
                </span>
                <span className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{project.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ───────── CTA ───────── */}
      <section data-reveal aria-labelledby="contact-heading" className="mt-20 rounded-3xl bg-zinc-950 px-6 py-14 text-center text-white sm:px-12 dark:bg-zinc-900">
        <h2 id="contact-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">Let&apos;s build something together</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-300">
          Have a website, mobile app or automation idea? Tell me about it and I will
          suggest the simplest way to make it real.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener"
            className="btn-lift inline-flex items-center gap-3 rounded-lg bg-[#25D366] px-7 py-3.5 font-semibold text-white hover:bg-[#1ebe5a]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Chat on WhatsApp
          </a>
          <a href={`mailto:${EMAIL}`} className="btn-lift inline-flex items-center rounded-lg border border-white/30 px-7 py-3.5 font-semibold text-white hover:bg-white/10">
            {EMAIL}
          </a>
        </div>
      </section>
    </>
  );
}
