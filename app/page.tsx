import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import ProjectCard from "@/components/ProjectCard";
import ReviewCard from "@/components/ReviewCard";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { techLogos } from "@/lib/tech-logos";
import {
  DEFINITION_SENTENCE,
  EDUCATION,
  EMAIL,
  EMPLOYER,
  FULL_NAME,
  HOME_TITLE,
  LOCATIONS_LABEL,
  PHOTO_PATH,
  WHATSAPP_URL,
} from "@/lib/config";
import { projects } from "@/lib/projects";
import { getApprovedReviews } from "@/lib/reviews";
import { personSchema, webSiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: DEFINITION_SENTENCE,
  alternates: { canonical: "/" },
  openGraph: { title: HOME_TITLE, description: DEFINITION_SENTENCE, url: "/" },
  twitter: { title: HOME_TITLE, description: DEFINITION_SENTENCE },
};

export const revalidate = 600;

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const services = [
  {
    title: "Web applications",
    body: "Fast, search-friendly websites and web apps built with Next.js, React and TypeScript — from landing pages to full platforms.",
    icon: (
      <path d="M3 5h18v12H3zM8 21h8M12 17v4" />
    ),
  },
  {
    title: "Mobile apps",
    body: "Cross-platform Android and iOS apps with Flutter and Firebase, designed to feel native and work well on everyday phones.",
    icon: <path d="M7 2h10v20H7zM11 18h2" />,
  },
  {
    title: "SaaS & back-ends",
    body: "Secure databases, authentication and multi-tenant systems with Supabase and PostgreSQL that scale as your business grows.",
    icon: <path d="M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zm0 0v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />,
  },
];

function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const sectionTitle =
  "text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50";
const eyebrow =
  "text-sm font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-400";

export default async function HomePage() {
  const reviews = await getApprovedReviews();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <>
      <JsonLd data={[personSchema(), webSiteSchema()]} />

      {/* ───────── Hero ───────── */}
      <section className="-mt-10 border-b border-zinc-200 pb-16 pt-12 sm:pt-20 lg:pb-20 dark:border-zinc-800">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Text */}
          <div className="order-2 text-center lg:order-1 lg:col-span-7 lg:text-left">
            <p
              className="reveal flex items-center justify-center gap-3 text-sm font-medium tracking-wide text-zinc-500 lg:justify-start dark:text-zinc-400"
              style={d(0)}
            >
              <span aria-hidden="true" className="hidden h-px w-8 bg-zinc-400 lg:block dark:bg-zinc-600" />
              Software Engineer · {LOCATIONS_LABEL}
            </p>

            <h1
              className="reveal mt-6 text-5xl font-bold leading-[1.02] tracking-[-0.035em] text-zinc-950 sm:text-6xl lg:text-7xl dark:text-white"
              style={d(80)}
            >
              Dobgima Joshua <br className="hidden sm:block" />
              Foncham<span className="text-sky-700 dark:text-sky-400">.</span>
            </h1>

            <p
              className="reveal mx-auto mt-7 max-w-xl text-lg leading-relaxed text-zinc-600 sm:text-xl lg:mx-0 dark:text-zinc-400"
              style={d(160)}
            >
              I build web and mobile products for businesses — clean, fast and
              dependable, from the first idea to a product your customers use
              every day.
            </p>

            <div
              className="reveal mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
              style={d(240)}
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-lg bg-zinc-950 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 sm:w-auto dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366] text-white">
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                </span>
                Apply to work with me
              </a>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 px-2 py-3 text-base font-semibold text-zinc-800 dark:text-zinc-200"
              >
                View selected work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <dl
              className="reveal mx-auto mt-14 grid max-w-xl grid-cols-3 divide-x divide-zinc-200 border-t border-zinc-200 pt-8 text-left lg:mx-0 dark:divide-zinc-800 dark:border-zinc-800"
              style={d(320)}
            >
              <div className="flex flex-col-reverse justify-end pr-4">
                <dt className="mt-1 text-xs font-medium uppercase leading-snug tracking-wider text-zinc-500 dark:text-zinc-400">Projects</dt>
                <dd className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                  {String(projects.length).padStart(2, "0")}
                </dd>
              </div>
              <div className="flex flex-col-reverse justify-end px-4">
                <dt className="mt-1 text-xs font-medium uppercase leading-snug tracking-wider text-zinc-500 dark:text-zinc-400">Businesses founded</dt>
                <dd className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">02</dd>
              </div>
              <div className="flex flex-col-reverse justify-end pl-4">
                <dt className="mt-1 text-xs font-medium uppercase leading-snug tracking-wider text-zinc-500 dark:text-zinc-400">Degree</dt>
                <dd className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">BTech</dd>
              </div>
            </dl>
          </div>

          {/* Portrait — static arch, no border */}
          <div className="reveal order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end" style={d(120)}>
            <figure className="relative w-64 sm:w-80 lg:w-[22rem]">
              <div
                aria-hidden="true"
                className="absolute inset-0 -translate-x-4 translate-y-4 rounded-b-[1.75rem] rounded-t-full bg-sky-100 dark:bg-sky-950/60"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-b-[1.75rem] rounded-t-full bg-zinc-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PHOTO_PATH}
                  alt="Dobgima Joshua Foncham, software engineer, working on a laptop"
                  width={1080}
                  height={1080}
                  fetchPriority="high"
                  className="h-full w-full object-cover object-[68%_50%]"
                />
              </div>
              <figcaption className="absolute -bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-xl bg-white px-4 py-3 text-left shadow-[0_12px_32px_-12px_rgb(0_0_0/0.25)] ring-1 ring-zinc-200 lg:-left-10 lg:translate-x-0 dark:bg-zinc-900 dark:ring-zinc-800">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
                    <rect x="3" y="7" width="18" height="13" rx="2" />
                    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
                  </svg>
                </span>
                <span>
                  <span className="block text-sm font-semibold text-zinc-950 dark:text-white">Founder, MotorWise</span>
                  <span className="block text-xs text-zinc-500 dark:text-zinc-400">Fleet maintenance software</span>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Technologies */}
        <div className="reveal mt-20 text-center" style={d(400)}>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Technologies I work with
          </p>
          <ul className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {techLogos.map((logo) => (
              <li
                key={logo.key}
                className="group flex items-center gap-2.5 text-zinc-400 transition-colors duration-300 dark:text-zinc-500"
                style={{ "--brand": logo.color } as CSSProperties}
              >
                <svg
                  role="img"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 transition-colors duration-300 group-hover:text-[var(--brand)] dark:group-hover:text-zinc-100"
                >
                  <path d={logo.d} />
                </svg>
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">{logo.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Services ───────── */}
      <section aria-labelledby="services-heading" className="scroll-reveal py-16 text-center">
        <p className={eyebrow}>What I do</p>
        <h2 id="services-heading" className={`mt-3 ${sectionTitle}`}>
          Products that work as hard as you do
        </h2>
        <div className="mt-12 grid gap-6 text-left md:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="lift rounded-2xl border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-400">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  {s.icon}
                </svg>
              </span>
              <h3 className="mt-5 text-lg font-semibold text-zinc-900 dark:text-zinc-50">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ───────── About ───────── */}
      <section aria-labelledby="about-heading" className="scroll-reveal py-16 text-center">
        <p className={eyebrow}>About</p>
        <h2 id="about-heading" className={`mt-3 ${sectionTitle}`}>
          About {FULL_NAME}
        </h2>
        <div className="mx-auto mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          <p>
            {FULL_NAME} is a Cameroonian software engineer working from{" "}
            {LOCATIONS_LABEL}. He holds a {EDUCATION.degree} from {EDUCATION.school}{" "}
            and works as {EMPLOYER.role.toLowerCase()} at {EMPLOYER.name}, an
            Africa-to-Japan education and travel consultancy.
          </p>
          <p>
            He is the founder of MotorWise and YADIMS Fabrics &amp; Seams, and has
            built platforms such as Home237 and Merit Leaders — taking each one from
            idea to a live product people use.
          </p>
        </div>
        <Link
          href="/about"
          className="mt-8 inline-flex items-center gap-1 font-semibold text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
        >
          More about me <ArrowRight />
        </Link>
      </section>

      {/* ───────── Projects ───────── */}
      <section aria-labelledby="projects-heading" className="scroll-reveal py-16 text-center">
        <p className={eyebrow}>Selected work</p>
        <h2 id="projects-heading" className={`mt-3 ${sectionTitle}`}>
          Featured projects
        </h2>
        <div className="mt-12 grid gap-6 text-left sm:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <h3 className="mt-14 text-xl font-semibold text-zinc-900 dark:text-zinc-50">More projects</h3>
        <ul className="mx-auto mt-4 max-w-2xl space-y-2 text-zinc-600 dark:text-zinc-400">
          {others.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="font-semibold text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
              >
                {project.name}
              </Link>{" "}
              — {project.tagline}
            </li>
          ))}
        </ul>
        <Link
          href="/projects"
          className="mt-8 inline-flex items-center gap-1 font-semibold text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
        >
          All projects <ArrowRight />
        </Link>
      </section>

      {/* ───────── Reviews ───────── */}
      <section aria-labelledby="reviews-heading" className="scroll-reveal py-16 text-center">
        <p className={eyebrow}>Testimonials</p>
        <h2 id="reviews-heading" className={`mt-3 ${sectionTitle}`}>
          What clients say
        </h2>
        {reviews.length > 0 ? (
          <>
            <div className="mt-12 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
              {reviews.slice(0, 3).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            <Link
              href="/reviews"
              className="mt-8 inline-flex items-center gap-1 font-semibold text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
            >
              Read all reviews <ArrowRight />
            </Link>
          </>
        ) : (
          <p className="mx-auto mt-6 max-w-xl text-zinc-600 dark:text-zinc-400">
            Client reviews will appear here. Worked with me?{" "}
            <Link
              href="/reviews#leave-a-review"
              className="font-semibold text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
            >
              Leave a review
            </Link>
          </p>
        )}
      </section>

      {/* ───────── Call to action ───────── */}
      <section aria-labelledby="cta-heading" className="scroll-reveal py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 via-sky-700 to-indigo-700 px-6 py-14 text-center text-white shadow-2xl shadow-sky-900/20 sm:px-12">
          <div aria-hidden="true" className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div aria-hidden="true" className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-amber-300/20 blur-2xl" />
          <h2 id="cta-heading" className="relative text-3xl font-bold tracking-tight sm:text-4xl">
            Have a project in mind?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-sky-100">
            Tell me about it on WhatsApp or by email. Available for freelance and
            remote work in Cameroon and internationally.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5a] sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Chat on WhatsApp
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/40 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto"
            >
              Send an email
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
