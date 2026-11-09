/**
 * Client reviews stored in Supabase, accessed through its REST API with the
 * anon key. Row-Level Security (supabase/reviews.sql) limits the anon key to
 * inserting pending reviews and reading approved ones. Server-side only.
 */

export interface Review {
  id: string;
  created_at: string;
  name: string;
  company: string | null;
  project: string | null;
  rating: number;
  body: string;
}

export interface NewReview {
  name: string;
  company: string | null;
  project: string | null;
  rating: number;
  body: string;
  email: string;
  consent: true;
}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

export const reviewsConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/** Approved reviews appear on the site within this many seconds. */
export const REVIEWS_REVALIDATE_SECONDS = 600;

function headers(): HeadersInit {
  return {
    apikey: SUPABASE_ANON_KEY ?? "",
    Authorization: `Bearer ${SUPABASE_ANON_KEY ?? ""}`,
    "Content-Type": "application/json",
  };
}

export async function getApprovedReviews(): Promise<Review[]> {
  if (!reviewsConfigured) return [];
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/reviews?select=id,created_at,name,company,project,rating,body&order=created_at.desc`,
      {
        headers: headers(),
        next: { revalidate: REVIEWS_REVALIDATE_SECONDS, tags: ["reviews"] },
      },
    );
    if (!res.ok) return [];
    return (await res.json()) as Review[];
  } catch {
    return [];
  }
}

export async function insertReview(review: NewReview): Promise<boolean> {
  if (!reviewsConfigured) return false;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/reviews`, {
      method: "POST",
      headers: { ...headers(), Prefer: "return=minimal" },
      body: JSON.stringify(review),
      cache: "no-store",
    });
    return res.ok;
  } catch {
    return false;
  }
}
