import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article data-reveal className="lift flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      {project.screenshot && (
        <Link href={`/projects/${project.slug}`} tabIndex={-1} aria-hidden="true" className="block border-b border-zinc-200 dark:border-zinc-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.screenshot}
            alt=""
            width={1200}
            height={750}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover object-top"
          />
        </Link>
      )}
      <div className="flex flex-1 flex-col p-6">
      {project.kind && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{project.kind}</p>
      )}
      <h3 className="text-lg font-semibold tracking-tight">
        <Link
          href={`/projects/${project.slug}`}
          className="text-zinc-900 hover:text-sky-700 dark:text-zinc-100 dark:hover:text-sky-400"
        >
          {project.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm font-medium text-sky-700 dark:text-sky-400">
        {project.role}
      </p>
      <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
        {project.tagline}
      </p>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
        {project.techStack.map((tech) => (
          <li
            key={tech}
            className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {tech}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm">
        <Link
          href={`/projects/${project.slug}`}
          className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
        >
          Read the case study →
        </Link>
      </p>
      </div>
    </article>
  );
}
