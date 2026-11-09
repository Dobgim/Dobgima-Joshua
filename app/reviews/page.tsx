import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReviewCard, { Stars } from "@/components/ReviewCard";
import ReviewForm from "@/components/ReviewForm";
import { FULL_NAME } from "@/lib/config";
import { projects } from "@/lib/projects";
import { getApprovedReviews } from "@/lib/reviews";

export const revalidate = 600;

const description = `Reviews from real clients of ${FULL_NAME}, software engineer in Buea, Cameroon, and a form for clients to leave their own review.`;

export const metadata: Metadata = {
  title: "Client reviews",
  description,
  alternates: { canonical: "/reviews" },
  openGraph: { title: `Client reviews for ${FULL_NAME}`, description, url: "/reviews" },
};

export default async function ReviewsPage() {
  const reviews = await getApprovedReviews();
  const average =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
        ]}
      />
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        Client reviews
      </h1>
      <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
        What clients say about working with {FULL_NAME}. Every review comes from a real
        client and is checked before it is published.
      </p>

      <section aria-labelledby="reviews-heading" className="mt-10">
        <h2 id="reviews-heading" className="sr-only">
          Published reviews
        </h2>
        {reviews.length > 0 ? (
          <>
            <p className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Stars rating={Math.round(average)} />
              <span>
                {average.toFixed(1)} out of 5 · {reviews.length} review
                {reviews.length > 1 ? "s" : ""}
              </span>
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </>
        ) : (
          <p className="rounded-xl border border-dashed border-zinc-300 p-6 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
            No reviews published yet. If we&apos;ve worked together, you can be the first
            below.
          </p>
        )}
      </section>

      <section
        id="leave-a-review"
        aria-labelledby="form-heading"
        className="mt-14 border-t border-zinc-200 pt-10 dark:border-zinc-800"
      >
        <h2
          id="form-heading"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Leave a review
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Worked with me? I&apos;d really appreciate an honest review. It will appear here
          after I&apos;ve confirmed it. Questions?{" "}
          <Link
            href="/contact"
            className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
          >
            Contact me
          </Link>
          .
        </p>
        <div className="mt-6">
          <ReviewForm projectNames={projects.map((p) => p.name)} />
        </div>
      </section>
    </>
  );
}
