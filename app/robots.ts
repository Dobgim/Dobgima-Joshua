import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/config";

/**
 * Explicitly welcomes search and AI crawlers. The named rules are redundant
 * with the catch-all allow, but make the policy unambiguous per bot.
 */
const WELCOME_BOTS = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

/** Private areas: the admin dashboard and internal API routes. */
const PRIVATE = ["/admin", "/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...WELCOME_BOTS.map((bot) => ({ userAgent: bot, allow: "/", disallow: PRIVATE })),
      { userAgent: "*", allow: "/", disallow: PRIVATE },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
