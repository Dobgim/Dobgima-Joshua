import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import ProjectCard from "@/components/ProjectCard";
import ReviewCard from "@/components/ReviewCard";
import { getApprovedReviews } from "@/lib/reviews";
import {
  DEFINITION_SENTENCE,
  EDUCATION,
  EMAIL,
  EMPLOYER,
  FULL_NAME,
  HOME_TITLE,
  KNOWS_ABOUT,
  PHOTO_PATH,
} from "@/lib/config";
import { projects } from "@/lib/projects";
import { personSchema, webSiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: DEFINITION_SENTENCE,
  alternates: { canonical: "/" },
  openGraph: {
    title: HOME_TITLE,
    description: DEFINITION_SENTENCE,
    url: "/",
  },
  twitter: {
    title: HOME_TITLE,
    description: DEFINITION_SENTENCE,
  },
};

export const revalidate = 600;

export default async function HomePage() {
  const reviews = await getApprovedReviews();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <>
      <JsonLd data={[personSchema(), webSiteSchema()]} />

      {/* Hero — always-dark panel, portrait centered */}
      <section className="relative left-1/2 right-1/2 -mx-[50vw] -mt-10 w-screen overflow-hidden bg-zinc-950 text-zinc-100">
        {/* Giant watermark behind the content */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/3 select-none text-center text-[22vw] font-bold italic leading-none text-white/[0.04]"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Dobgima
        </span>

        <div className="relative mx-auto grid max-w-6xl items-center gap-x-8 gap-y-10 px-4 pb-10 pt-12 sm:pt-16 lg:grid-cols-[1fr_auto_1fr]">
          {/* Left: headline */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-300">
              Software Engineer · Buea, Cameroon
            </p>
            <h1 className="mt-4 text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl">
              Dobgima
              <br />
              Joshua
              <br />
              <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                Foncham
              </span>
            </h1>
            <p className="mt-5 text-lg font-light uppercase tracking-wide text-zinc-300">
              Helping businesses through{" "}
              <span className="text-amber-300">
                software, mobile &amp; AI
              </span>
            </p>
          </div>

          {/* Center: portrait */}
          <div className="order-1 justify-self-center lg:order-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTO_PATH}
              alt="Dobgima Joshua Foncham working on a laptop"
              width={420}
              height={420}
              className="w-72 max-w-full sm:w-96"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 78%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 78%, transparent 100%)",
              }}
            />
            <p
              aria-hidden="true"
              className="-mt-8 text-center text-2xl italic text-amber-200/90"
              style={{
                fontFamily:
                  "'Segoe Script', 'Brush Script MT', 'Lucida Handwriting', cursive",
              }}
            >
              Dobgima Joshua
            </p>
          </div>

          {/* Right: why */}
          <div className="order-3 text-center lg:text-left">
            <a
              href="https://github.com/dobgimajoshua"
              rel="me noopener"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition-colors hover:bg-white/10"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
              </svg>
              @dobgimajoshua
            </a>
            <h2 className="mt-6 text-lg font-semibold uppercase tracking-wide">
              Why I build
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {DEFINITION_SENTENCE}
            </p>
          </div>
        </div>

        {/* Stats + CTA band */}
        <div className="relative border-t border-white/10">
          <div className="mx-auto grid max-w-4xl items-center gap-6 px-4 py-8 text-center sm:grid-cols-3">
            <div>
              <p className="text-3xl font-bold text-amber-300">6+</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-zinc-400">
                Products built &amp; shipped
              </p>
            </div>
            <Link
              href="/contact"
              className="rounded-lg bg-gradient-to-r from-amber-200 to-amber-400 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-zinc-900 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            >
              Apply to work with me
            </Link>
            <div>
              <p className="text-3xl font-bold text-amber-300">MotorWise</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-zinc-400">
                Founder
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section aria-labelledby="about-heading" className="border-t border-zinc-200 py-10 dark:border-zinc-800">
        <h2 id="about-heading" className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          About {FULL_NAME}
        </h2>
        <div className="mt-4 max-w-3xl space-y-4 text-zinc-600 dark:text-zinc-400">
          <p>
            {FULL_NAME} holds a {EDUCATION.degree} from {EDUCATION.school} and
            works as {EMPLOYER.role.toLowerCase()} at {EMPLOYER.name},{" "}
            {EMPLOYER.description.charAt(0).toLowerCase() +
              EMPLOYER.description.slice(1)}
            .
          </p>
          <p>
            His core stack is {KNOWS_ABOUT.slice(0, 6).join(", ")}, and he is
            currently expanding into AI automation.
          </p>
        </div>
        <p className="mt-5">
          <Link
            href="/about"
            className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
          >
            More about me →
          </Link>
        </p>
      </section>

      {/* Featured projects */}
      <section aria-labelledby="projects-heading" className="border-t border-zinc-200 py-10 dark:border-zinc-800">
        <h2 id="projects-heading" className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Featured projects
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <h3 className="mt-10 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          More projects
        </h3>
        <ul className="mt-3 space-y-2 text-zinc-600 dark:text-zinc-400">
          {others.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
              >
                {project.name}
              </Link>{" "}
              — {project.tagline}
            </li>
          ))}
        </ul>
        <p className="mt-5">
          <Link
            href="/projects"
            className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
          >
            All projects →
          </Link>
        </p>
      </section>

      {/* Client reviews */}
      <section aria-labelledby="reviews-heading" className="border-t border-zinc-200 py-10 dark:border-zinc-800">
        <h2 id="reviews-heading" className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          What clients say
        </h2>
        {reviews.length > 0 && (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(0, 3).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
        <p className="mt-5 text-zinc-600 dark:text-zinc-400">
          {reviews.length > 0 ? (
            <Link href="/reviews" className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400">
              Read all reviews →
            </Link>
          ) : (
            <>
              Worked with me?{" "}
              <Link href="/reviews#leave-a-review" className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400">
                Leave a review →
              </Link>
            </>
          )}
        </p>
      </section>

      {/* Contact strip */}
      <section aria-labelledby="contact-heading" className="border-t border-zinc-200 py-10 dark:border-zinc-800">
        <h2 id="contact-heading" className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Work with me
        </h2>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Available for freelance and remote work on web, mobile and AI
          projects. Email{" "}
          <a
            href={`mailto:${EMAIL}`}
            className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
          >
            {EMAIL}
          </a>{" "}
          or see the <Link href="/contact" className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400">contact page</Link>.
        </p>
      </section>
    </>
  );
}
