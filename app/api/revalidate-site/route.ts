import { revalidatePath, revalidateTag } from "next/cache";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-public";

/**
 * Refreshes every page after a project is added, edited, hidden or deleted
 * in /admin. Only a signed-in admin can call it: the caller's Supabase
 * access token is checked against public.is_admin() first.
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

  revalidateTag("projects");
  revalidatePath("/", "layout");
  for (const p of ["/sitemap.xml", "/llms.txt", "/llms-full.txt"]) revalidatePath(p);
  return Response.json({ ok: true });
}
