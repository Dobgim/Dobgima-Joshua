import { SUPABASE_URL, supabaseHeaders } from "./supabase-public";

export const PROJECT_TYPES = [
  "Business website",
  "Online store",
  "Web application or dashboard",
  "Website redesign",
  "Mobile app",
  "AI automation",
  "Other",
] as const;

/** Rough ranges; FCFA amounts are approximate conversions. */
export const BUDGETS = [
  "Under $500 (about 300,000 FCFA)",
  "$500 to $1,500 (about 300,000 to 900,000 FCFA)",
  "$1,500 to $5,000 (about 900,000 to 3,000,000 FCFA)",
  "Over $5,000 (over 3,000,000 FCFA)",
  "Not sure yet",
] as const;

export interface NewEnquiry {
  name: string;
  email: string;
  phone: string | null;
  project_type: string;
  budget: string;
  description: string;
}

export async function insertEnquiry(enquiry: NewEnquiry): Promise<boolean> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/enquiries`, {
      method: "POST",
      headers: { ...supabaseHeaders(), Prefer: "return=minimal" },
      body: JSON.stringify(enquiry),
      cache: "no-store",
    });
    return res.ok;
  } catch {
    return false;
  }
}
