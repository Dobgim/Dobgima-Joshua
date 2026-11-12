import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { FULL_NAME } from "@/lib/config";
import { getAllPosts, getPost } from "@/lib/blog";
import { blogPostingSchema } from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.seoTitle ? { absolute: post.seoTitle } : post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    // Drafts stay out of the index until published.
    robots: post.draft ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${slug}`,
      publishedTime: post.date,
      authors: [FULL_NAME],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      {!post.draft && <JsonLd data={blogPostingSchema(post)} />}
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <article className="max-w-3xl">
        {post.draft && (
          <p className="mb-4 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
            Draft outline, not published yet
          </p>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          By{" "}
          <Link
            href="/about"
            className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
          >
            {FULL_NAME}
          </Link>{" "}
          · <time dateTime={post.date}>{post.date}</time> · {post.readingMinutes} min read
          {post.tags.length > 0 && <> · {post.tags.join(", ")}</>}
        </p>
        <div className="prose-basic mt-8 text-zinc-700 dark:text-zinc-300">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </>
  );
}
