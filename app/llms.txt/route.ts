import { llmsTxt } from "@/lib/llms";

export const dynamic = "force-static";
export const revalidate = 60;

export async function GET(): Promise<Response> {
  return new Response(await llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
