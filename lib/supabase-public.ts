/**
 * Public connection details for the live Supabase project "my portfolio".
 * The publishable key is designed to be public: Row-Level Security
 * (supabase/reviews.sql, supabase/admin.sql) decides what it can do.
 * Never put a secret key or a personal access token here.
 */
export const SUPABASE_URL = (
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  process.env.SUPABASE_URL ??
  "https://eajnbrzgmckxeeohtdrt.supabase.co"
).replace(/\/+$/, "");

export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.SUPABASE_PUBLISHABLE_KEY ??
  process.env.SUPABASE_ANON_KEY ??
  "sb_publishable_rW9tdTbdv2LvzNMbsy5I3w_DJqBaokL";

/** Headers for a PostgREST call. Legacy anon keys are JWTs and may also go in
 *  Authorization; new sb_publishable_ keys must only be sent as apikey. */
export function supabaseHeaders(userAccessToken?: string): Record<string, string> {
  const key = SUPABASE_PUBLISHABLE_KEY;
  const bearer = userAccessToken ?? (key.startsWith("eyJ") ? key : undefined);
  return {
    apikey: key,
    "Content-Type": "application/json",
    ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
  };
}
