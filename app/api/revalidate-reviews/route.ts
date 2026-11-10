import { revalidatePath } from "next/cache";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-public";

/**
 * Refreshes the public pages that show reviews. Only a signed-in admin can
 * trigger it: the caller's Supabase access token is checked against
 * public.is_admin() before anything is revalidated.
 */
export async function POST(request: Request): Promise<Response> {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return Response.json({ ok: false, error: "Not signed in" }, { status: 401 });

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/is_admin`, {
      method: "POST",
      headers: supabaseHeaders(token),
      body: "{}",
      cache: "no-store",
    });
    const isAdmin = res.ok && (await res.json()) === true;
    if (!isAdmin) return Response.json({ ok: false, error: "Not an admin" }, { status: 403 });
  } catch {
    return Response.json({ ok: false, error: "Could not verify admin" }, { status: 502 });
  }

  revalidatePath("/reviews");
  revalidatePath("/");
  return Response.json({ ok: true });
}
