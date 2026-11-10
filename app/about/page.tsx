import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import {
  DEFINITION_SENTENCE,
  EDUCATION,
  EMAIL,
  EMPLOYER,
  FULL_NAME,
  KNOWS_ABOUT,
  LOCATIONS_LABEL,
  PHONE_DISPLAY,
  SITE_UPDATED,
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

export default function AboutPage() {
  return (
    <>
      <JsonLd data={profilePageSchema()} />
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        About {FULL_NAME}
      </h1>

      <div className="mt-8 flex flex-col gap-8 md:flex-row">
        <div className="relative w-60 shrink-0 self-center md:self-start">
        <span aria-hidden="true" className="absolute bottom-[8%] left-1/2 aspect-square w-[88%] -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-100 to-sky-50/0 dark:from-zinc-200 dark:to-zinc-200/0" />
        <picture className="relative block">
          <source srcSet="/dobgima-joshua-foncham-portrait.webp" type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/dobgima-joshua-foncham-portrait.png"
            alt="Dobgima Joshua Foncham"
            width={720}
            height={680}
            className="relative h-auto w-full"
          />
        </picture>
        </div>
        <div className="max-w-2xl space-y-4 text-zinc-600 dark:text-zinc-400">
          <p className="text-lg leading-relaxed">{DEFINITION_SENTENCE}</p>
          <p>
            He also goes by Joshua Foncham, Dobgima Joshua and the nickname
            KIMMICH.
          </p>
          <p>
            {FULL_NAME} earned a {EDUCATION.degree} at {EDUCATION.school} in{" "}
            {EDUCATION.city}, and works as {EMPLOYER.role.toLowerCase()} at{" "}
            {EMPLOYER.name}, {EMPLOYER.description.charAt(0).toLowerCase() + EMPLOYER.description.slice(1)}.
          </p>
          <p>
            Beyond client and employer work, he founded MotorWise (an AI
            vehicle maintenance platform) and YADIMS Fabrics &amp; Seams, built
            and deployed Home237 (a property rental platform for Cameroon), and
            is co-building the EdTech startup WeLearn.
          </p>
        </div>
      </div>

      <section data-reveal aria-labelledby="facts-heading" className="mt-12">
        <h2 id="facts-heading" className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Key facts about {FULL_NAME}
        </h2>
        <dl className="mt-5 grid overflow-hidden rounded-2xl border border-zinc-200 sm:grid-cols-2 dark:border-zinc-800">
          {[
            ["Full name", FULL_NAME],
            ["Also known as", "Joshua Foncham, Dobgima Joshua, KIMMICH"],
            ["Profession", "Software Engineer"],
            ["Based in", LOCATIONS_LABEL],
            ["Education", `${EDUCATION.degree}, ${EDUCATION.school}`],
            ["Works at", `${EMPLOYER.name} (${EMPLOYER.role.toLowerCase()})`],
            ["Founder of", "MotorWise and YADIMS Fabrics & Seams"],
            ["Services", services.map((s) => s.name).join(", ")],
            ["Core stack", "Next.js, TypeScript, React, Flutter, Supabase, Firebase"],
            ["Contact", `WhatsApp ${PHONE_DISPLAY} · ${EMAIL}`],
          ].map(([term, value]) => (
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

      <section data-reveal aria-labelledby="skills-heading" className="mt-12">
        <h2 id="skills-heading" className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Skills &amp; technologies
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
          {KNOWS_ABOUT.map((skill) => (
            <li
              key={skill}
              className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section data-reveal aria-labelledby="work-heading" className="mt-12">
        <h2 id="work-heading" className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Selected work
        </h2>
        <ul className="mt-4 space-y-2 text-zinc-600 dark:text-zinc-400">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
              >
                {project.name}
              </Link>{" "}
              ({project.role}): {project.tagline}
            </li>
          ))}
        </ul>
      </section>

      <section data-reveal aria-labelledby="contact-heading" className="mt-12">
        <h2 id="contact-heading" className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Get in touch
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Email{" "}
          <a
            href={`mailto:${EMAIL}`}
            className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
          >
            {EMAIL}
          </a>{" "}
          or use the{" "}
          <Link
            href="/contact"
            className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
          >
            contact page
          </Link>
          .
        </p>
      </section>
    </>
  );
}
