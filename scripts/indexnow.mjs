/**
 * Pings IndexNow (Bing, Yandex, etc.) with every URL in the live sitemap.
 * Run AFTER deploying: npm run indexnow
 *
 * It fetches {DOMAIN}/sitemap.xml, extracts the URLs and submits them in one
 * batch to api.indexnow.org with the key file served from /public.
 */

const DOMAIN = "https://dobgimajoshua.dev"; // keep in sync with lib/config.ts DOMAIN
const KEY = "618c969cd838b82f0f6aef45b2914f97"; // must match the key file in /public

async function main() {
  const sitemapUrl = `${DOMAIN}/sitemap.xml`;
  console.log(`Fetching ${sitemapUrl} ...`);
  const res = await fetch(sitemapUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap: HTTP ${res.status}. Is the site deployed?`);
  }
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urls.length === 0) throw new Error("No <loc> entries found in sitemap.");
  console.log(`Submitting ${urls.length} URLs to IndexNow:`);
  for (const u of urls) console.log(`  ${u}`);

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(DOMAIN).host,
      key: KEY,
      keyLocation: `${DOMAIN}/${KEY}.txt`,
      urlList: urls,
    }),
  });

  console.log(`IndexNow response: HTTP ${response.status} ${response.statusText}`);
  if (response.status === 200 || response.status === 202) {
    console.log("Submitted successfully.");
  } else {
    const body = await response.text();
    console.error(body);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exitCode = 1;
});
