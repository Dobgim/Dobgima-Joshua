import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { FULL_NAME } from "@/lib/config";
import { getProject, getProjects } from "@/lib/projects";
import { projectSchema } from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  const description = `${project.name}: ${project.tagline} Case study by ${FULL_NAME}.`;
  return {
    title: `${project.name} case study`,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.name}, a case study by ${FULL_NAME}`,
      description,
      url: `/projects/${slug}`,
    },
  };
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section data-reveal className="mt-8">
      <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        {title}
      </h2>
      <div className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd data={projectSchema(project)} />
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.name, path: `/projects/${project.slug}` },
        ]}
      />

      <p className="text-sm font-medium uppercase tracking-widest text-sky-700 dark:text-sky-400">
        Case study
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        {project.name}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
        {project.tagline}
      </p>

      <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
        {project.kind && (
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Project type</dt>
            <dd className="font-semibold text-zinc-900 dark:text-zinc-100">{project.kind}</dd>
          </div>
        )}
        <div>
          <dt className="text-zinc-500 dark:text-zinc-400">My role</dt>
          <dd className="font-semibold text-zinc-900 dark:text-zinc-100">{project.role}</dd>
        </div>
        <div>
          <dt className="text-zinc-500 dark:text-zinc-400">Built with</dt>
          <dd className="font-semibold text-zinc-900 dark:text-zinc-100">{project.techStack.join(", ")}</dd>
        </div>
      </dl>

      {project.screenshot && (
        <figure className="mt-10 overflow-hidden rounded-2xl border border-zinc-200 shadow-sm dark:border-zinc-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.screenshot}
            alt={`Screenshot of the ${project.name} homepage, built by ${FULL_NAME}`}
            width={1200}
            height={750}
            className="w-full"
          />
          <figcaption className="border-t border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            {project.name} homepage{project.liveUrl ? ` (${project.liveUrl.replace(/^https?:\/\//, "")})` : ""}
          </figcaption>
        </figure>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <section aria-label={`More screens from ${project.name}`} className="mt-6 grid gap-6 sm:grid-cols-2">
          {project.gallery.map((shot) => (
            <figure key={shot.src} className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.src}
                alt={`${project.name}: ${shot.caption}`}
                width={1200}
                height={750}
                loading="lazy"
                className="w-full"
              />
              <figcaption className="border-t border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </section>
      )}

      <Section title="Problem">
        <p>{project.problem}</p>
      </Section>

      <Section title="My solution">
        <p>{project.whatIBuilt}</p>
      </Section>

      <Section title="My role">
        <p>{project.myRole}</p>
      </Section>

      <Section title="Tech stack">
        <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
          {project.techStack.map((tech) => (
            <li
              key={tech}
              className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Key features">
        <ul className="list-disc space-y-1 pl-5">
          {project.keyFeatures.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </Section>

      <Section title="Result / status">
        <p>{project.result}</p>
      </Section>

      <Section title="Live demo">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            rel="noopener"
            className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
          >
            {project.liveUrl.replace(/^https?:\/\//, "")}
          </a>
        ) : (
          <p>{project.liveUrlNote ?? "Not publicly available yet."}</p>
        )}
      </Section>

      <p className="mt-10 border-t border-zinc-200 pt-6 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
        Built by{" "}
        <Link
          href="/about"
          className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
        >
          {FULL_NAME}
        </Link>
        , software engineer in Buea, Cameroon ·{" "}
        <Link
          href="/projects"
          className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
        >
          All projects
        </Link>
      </p>
    </>
  );
}
