import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article data-reveal className="lift flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
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
    </article>
  );
}
