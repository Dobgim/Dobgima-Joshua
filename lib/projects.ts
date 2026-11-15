export interface Project {
  slug: string;
  name: string;
  tagline: string;
  role: string;
  liveUrl: string | null;
  liveUrlNote?: string;
  featured: boolean;
  /** "SoftwareApplication" gets SoftwareApplication JSON-LD, otherwise CreativeWork. */
  schemaType: "SoftwareApplication" | "CreativeWork";
  applicationCategory?: string;
  techStack: string[];
  problem: string;
  whatIBuilt: string;
  myRole: string;
  keyFeatures: string[];
  result: string;
  /** Honest label: whose project it is. Left out until confirmed. */
  kind?: ProjectKind;
  /** Screenshot of the finished product in /public/projects. */
  screenshot?: string;
  /** Extra screenshots of inner pages and app screens. */
  gallery?: { src: string; caption: string }[];
}

export const PROJECT_KINDS = ["Own product", "Co-founded startup", "Client project", "Personal project", "Demo"] as const;
export type ProjectKind = (typeof PROJECT_KINDS)[number];

import { SUPABASE_URL, supabaseHeaders } from "./supabase-public";
import { seedProjects } from "./projects-seed";

/** Row shape of public.projects (snake_case columns). */
export interface ProjectRow {
  slug: string;
  name: string;
  tagline: string;
  role: string;
  kind: ProjectKind | null;
  live_url: string | null;
  live_url_note: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  schema_type: "SoftwareApplication" | "CreativeWork";
  application_category: string | null;
  tech_stack: string[];
  problem: string;
  what_i_built: string;
  my_role: string;
  key_features: string[];
  result: string;
  screenshot: string | null;
  gallery: { src: string; caption: string }[];
}

export function rowToProject(r: ProjectRow): Project {
  return {
    slug: r.slug,
    name: r.name,
    tagline: r.tagline,
    role: r.role,
    liveUrl: r.live_url || null,
    liveUrlNote: r.live_url_note || undefined,
    featured: r.featured,
    schemaType: r.schema_type,
    applicationCategory: r.application_category || undefined,
    techStack: r.tech_stack ?? [],
    problem: r.problem,
    whatIBuilt: r.what_i_built,
    myRole: r.my_role,
    keyFeatures: r.key_features ?? [],
    result: r.result,
    kind: r.kind ?? undefined,
    screenshot: r.screenshot || undefined,
    gallery: r.gallery?.length ? r.gallery : undefined,
  };
}

/** Pages refresh within this many seconds; admin changes refresh instantly. */
export const PROJECTS_REVALIDATE_SECONDS = 60;

/** Published projects in display order, from Supabase (managed in /admin). */
export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/projects?select=*&published=eq.true&order=sort_order.asc,created_at.asc`,
      { headers: supabaseHeaders(), next: { revalidate: PROJECTS_REVALIDATE_SECONDS, tags: ["projects"] } },
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return ((await res.json()) as ProjectRow[]).map(rowToProject);
  } catch {
    // The database is the source of truth; the snapshot only keeps builds working offline.
    return seedProjects;
  }
}

export async function getProject(slug: string): Promise<Project | undefined> {
  return (await getProjects()).find((p) => p.slug === slug);
}
