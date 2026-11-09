import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import ProjectCard from "@/components/ProjectCard";
import ReviewCard from "@/components/ReviewCard";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
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
      <section className="relative isolate -mt-10 pb-16 pt-10 sm:pt-16 lg:pb-24">
        {/* Soft background accents */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-visible">
          <div className="absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-[80%] rounded-full bg-sky-200/50 blur-3xl dark:bg-sky-900/30" />
          <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-amber-200/50 blur-3xl dark:bg-amber-900/20" />
          <div
            className="absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
            style={{
              backgroundImage: "radial-gradient(rgb(148 163 184 / 0.5) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          {/* Text */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <p
              className="reveal inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300"
              style={d(0)}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for new projects
            </p>

            <p className={`reveal mt-6 ${eyebrow}`} style={d(100)}>
              Software Engineer · {LOCATIONS_LABEL}
            </p>

            <h1
              className="reveal mt-4 text-5xl font-extrabold leading-[1.05] tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl dark:text-white"
              style={d(200)}
            >
              Dobgima Joshua{" "}
              <span className="text-shimmer bg-gradient-to-r from-sky-600 via-amber-500 to-sky-600 bg-clip-text text-transparent">
                Foncham
              </span>
            </h1>

            <p
              className="reveal mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-600 sm:text-xl lg:mx-0 dark:text-zinc-400"
              style={d(320)}
            >
              I design and build fast, reliable web and mobile applications that
              help businesses launch, grow and serve their customers better — from
              the first idea to a polished product in production.
            </p>

            <div
              className="reveal mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
              style={d(440)}
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-green-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5a] hover:shadow-xl hover:shadow-green-600/30 sm:w-auto"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Apply to work with me
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <Link
                href="/projects"
                className="inline-flex w-full items-center justify-center rounded-full border border-zinc-300 bg-white/70 px-7 py-3.5 text-base font-semibold text-zinc-800 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-md sm:w-auto dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-100"
              >
                View my work
              </Link>
            </div>

            <dl
              className="reveal mx-auto mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-zinc-200 pt-8 lg:mx-0 dark:border-zinc-800"
              style={d(560)}
            >
              <div>
                <dt className="sr-only">Projects</dt>
                <dd className="text-lg font-bold leading-tight text-zinc-900 sm:text-2xl dark:text-white">{projects.length}+</dd>
                <dd className="mt-1 text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">Projects built</dd>
              </div>
              <div>
                <dt className="sr-only">Company</dt>
                <dd className="text-lg font-bold leading-tight text-zinc-900 sm:text-2xl dark:text-white">MotorWise</dd>
                <dd className="mt-1 text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">Founder</dd>
              </div>
              <div>
                <dt className="sr-only">Platforms</dt>
                <dd className="text-lg font-bold leading-tight text-zinc-900 sm:text-2xl dark:text-white">Web + Mobile</dd>
                <dd className="mt-1 text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">End to end</dd>
              </div>
            </dl>
          </div>

          {/* Portrait — borderless organic shape */}
          <div className="reveal-scale order-1 flex justify-center lg:order-2" style={d(150)}>
            <div className="portrait-float relative">
              <div
                aria-hidden="true"
                className="portrait-ring absolute -inset-6 rounded-full opacity-70 blur-2xl"
                style={{
                  background:
                    "conic-gradient(from 0deg, #38bdf8, #fbbf24, #34d399, #38bdf8)",
                }}
              />
              <div className="portrait-blob relative h-72 w-72 overflow-hidden shadow-2xl shadow-sky-900/20 sm:h-96 sm:w-96">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PHOTO_PATH}
                  alt="Dobgima Joshua Foncham, software engineer, working on a laptop"
                  width={1080}
                  height={1080}
                  fetchPriority="high"
                  className="h-full w-full scale-110 object-cover object-[60%_40%]"
                />
              </div>

              <span
                className="float-badge absolute -left-4 top-10 rounded-2xl bg-white/90 px-4 py-2 text-sm font-semibold text-zinc-800 shadow-lg ring-1 ring-zinc-200 backdrop-blur sm:-left-10 dark:bg-zinc-900/90 dark:text-zinc-100 dark:ring-zinc-700"
                style={d(0)}
              >
                ⚡ Next.js · React
              </span>
              <span
                className="float-badge absolute -right-2 top-1/2 rounded-2xl bg-white/90 px-4 py-2 text-sm font-semibold text-zinc-800 shadow-lg ring-1 ring-zinc-200 backdrop-blur sm:-right-8 dark:bg-zinc-900/90 dark:text-zinc-100 dark:ring-zinc-700"
                style={d(1500)}
              >
                📱 Flutter apps
              </span>
              <span
                className="float-badge absolute bottom-6 left-2 rounded-2xl bg-white/90 px-4 py-2 text-sm font-semibold text-zinc-800 shadow-lg ring-1 ring-zinc-200 backdrop-blur sm:-left-4 dark:bg-zinc-900/90 dark:text-zinc-100 dark:ring-zinc-700"
                style={d(3000)}
              >
                🔒 Supabase · Firebase
              </span>
            </div>
          </div>
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
          More about me <span aria-hidden="true">→</span>
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
          All projects <span aria-hidden="true">→</span>
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
              Read all reviews <span aria-hidden="true">→</span>
            </Link>
          </>
        ) : (
          <p className="mx-auto mt-6 max-w-xl text-zinc-600 dark:text-zinc-400">
            Client reviews will appear here. Worked with me?{" "}
            <Link
              href="/reviews#leave-a-review"
              className="font-semibold text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
            >
              Leave a review →
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
