import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProjectCard from "@/components/ProjectCard";
import JsonLd from "@/components/JsonLd";
import { projectListSchema, webPageSchema } from "@/lib/schema";
import { FULL_NAME } from "@/lib/config";
import { projects } from "@/lib/projects";

const description = `Projects built by ${FULL_NAME}: MotorWise, Merit Leaders, Home237, YADIMS Fabrics & Seams, FoodieExpress, TradeHub B2B, WeLearn, a school management system and a booking system demo.`;

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: { title: `Projects by ${FULL_NAME}`, description, url: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={[webPageSchema({ type: "CollectionPage", path: "/projects", name: `Projects by ${FULL_NAME}`, description }), projectListSchema(projects)]} />
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ]}
      />
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        Projects by {FULL_NAME}
      </h1>
      <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Products and platforms I founded, co-founded or built, each with a
        full case study. More background on the{" "}
        <Link
          href="/about"
          className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
        >
          about page
        </Link>
        .
      </p>
      <div data-reveal-group className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
