import type { Review } from "@/lib/reviews";

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`h-4 w-4 ${n <= rating ? "text-amber-400" : "text-zinc-300 dark:text-zinc-700"}`}
        >
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8L12 2.5z" />
        </svg>
      ))}
    </span>
  );
}

export default function ReviewCard({ review }: { review: Review }) {
  const date = review.created_at.slice(0, 10);
  return (
    <figure className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <Stars rating={review.rating} />
      <blockquote className="mt-3 flex-1 whitespace-pre-line text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        “{review.body}”
      </blockquote>
      <figcaption className="mt-4 text-sm">
        <span className="font-semibold text-zinc-900 dark:text-zinc-100">{review.name}</span>
        {review.company && <span className="text-zinc-500 dark:text-zinc-400"> · {review.company}</span>}
        <span className="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-400">
          {review.project && <>{review.project} · </>}
          <time dateTime={date}>{date}</time>
        </span>
      </figcaption>
    </figure>
  );
}
