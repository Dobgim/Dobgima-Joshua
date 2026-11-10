import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { FULL_NAME } from "@/lib/config";
import { getAllPosts } from "@/lib/blog";

const description = `Articles by ${FULL_NAME} on building software: Next.js, Supabase, Flutter, mobile money payments and AI automation.`;

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title: `Blog by ${FULL_NAME}`, description, url: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        Blog
      </h1>
      <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Notes on building real products from Buea, Cameroon, by{" "}
        <Link
          href="/about"
          className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
        >
          {FULL_NAME}
        </Link>
        .
      </p>
      <ul data-reveal-group className="mt-8 max-w-3xl space-y-6">
        {posts.map((post) => (
          <li
            key={post.slug}
            data-reveal
            className="lift rounded-xl border border-zinc-200 p-5 dark:border-zinc-800"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-zinc-900 hover:text-sky-700 dark:text-zinc-100 dark:hover:text-sky-400"
                >
                  {post.title}
                </Link>
              </h2>
              {post.draft && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                  Draft
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              <time dateTime={post.date}>{post.date}</time> · {post.readingMinutes} min read
              {post.tags.length > 0 && <> · {post.tags.join(", ")}</>}
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {post.description}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
