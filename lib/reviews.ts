/**
 * Client reviews stored in Supabase, accessed through its REST API with the
 * anon key. Row-Level Security (supabase/reviews.sql) limits the anon key to
 * inserting pending reviews and reading approved ones. Server-side only.
 */

import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, supabaseHeaders } from "./supabase-public";

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

const SUPABASE_URL_BASE = SUPABASE_URL;

export const reviewsConfigured = Boolean(SUPABASE_URL_BASE && SUPABASE_PUBLISHABLE_KEY);

/** Approved reviews appear on the site within this many seconds
 *  (instantly when approved from /admin, which purges the cache). */
export const REVIEWS_REVALIDATE_SECONDS = 60;

function headers(): HeadersInit {
  return supabaseHeaders();
}

export async function getApprovedReviews(): Promise<Review[]> {
  if (!reviewsConfigured) return [];
  try {
    const res = await fetch(
      `${SUPABASE_URL_BASE}/rest/v1/reviews?select=id,created_at,name,company,project,rating,body&order=created_at.desc`,
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
    const res = await fetch(`${SUPABASE_URL_BASE}/rest/v1/reviews`, {
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
