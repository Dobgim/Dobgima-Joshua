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
  PHOTO_PATH,
} from "@/lib/config";
import { projects } from "@/lib/projects";
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PHOTO_PATH}
          alt="Dobgima Joshua Foncham"
          width={240}
          height={240}
          className="h-60 w-60 rounded-xl border border-zinc-200 object-cover dark:border-zinc-800"
        />
        <div className="max-w-2xl space-y-4 text-zinc-600 dark:text-zinc-400">
          <p className="text-lg leading-relaxed">{DEFINITION_SENTENCE}</p>
          <p>
            He also goes by Joshua Foncham, Dobgima Joshua and the nickname
            KIMMICH.
          </p>
          <p>
            {FULL_NAME} earned a {EDUCATION.degree} at {EDUCATION.school} in{" "}
            {EDUCATION.city}, and works as {EMPLOYER.role.toLowerCase()} at{" "}
            {EMPLOYER.name} — {EMPLOYER.description.charAt(0).toLowerCase() + EMPLOYER.description.slice(1)}.
          </p>
          <p>
            Beyond client and employer work, he founded MotorWise (an AI
            vehicle maintenance platform) and YADIMS Fabrics &amp; Seams, built
            and deployed Home237 (a property rental platform for Cameroon), and
            is co-building the EdTech startup WeLearn.
          </p>
        </div>
      </div>

      <section aria-labelledby="skills-heading" className="mt-12">
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

      <section aria-labelledby="work-heading" className="mt-12">
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
              ({project.role}) — {project.tagline}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="contact-heading" className="mt-12">
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
