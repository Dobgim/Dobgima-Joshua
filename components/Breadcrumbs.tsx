import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";

/** Visible breadcrumb trail + matching BreadcrumbList JSON-LD. */
export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm">
        <ol className="flex flex-wrap items-center gap-1 text-zinc-500 dark:text-zinc-400">
          {crumbs.map((crumb, i) => (
            <li key={crumb.path} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === crumbs.length - 1 ? (
                <span aria-current="page" className="text-zinc-700 dark:text-zinc-300">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className="underline-offset-4 hover:text-sky-700 hover:underline dark:hover:text-sky-400"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
