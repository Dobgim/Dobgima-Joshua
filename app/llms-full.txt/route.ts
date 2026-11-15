import { llmsFullTxt } from "@/lib/llms";

export const dynamic = "force-static";
export const revalidate = 60;

export async function GET(): Promise<Response> {
  return new Response(await llmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
