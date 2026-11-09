# dobgimajoshua.com — personal site of Dobgima Joshua Foncham

Next.js (App Router) + TypeScript strict + Tailwind CSS. Every page is statically generated, so the full HTML (content **and** JSON-LD) is readable with JavaScript disabled — which is what search and AI crawlers see.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages prerendered)
```

## Where things live

| What | Where |
|---|---|
| Domain + identity (change domain in ONE place) | `lib/config.ts` → `DOMAIN` |
| Project data / case studies | `lib/projects.ts` |
| FAQ questions & answers | `lib/faq.ts` |
| JSON-LD builders (Person, WebSite, ProfilePage, FAQPage, BlogPosting, CreativeWork/SoftwareApplication, BreadcrumbList) | `lib/schema.ts` |
| Blog posts (MDX + frontmatter: title, description, date, tags, draft) | `content/blog/*.mdx` |
| AI-crawler summaries | `public/llms.txt`, `public/llms-full.txt` |
| Sitemap / robots / RSS | `app/sitemap.ts`, `app/robots.ts`, `app/rss.xml/route.ts` |
| IndexNow key + ping script | `public/<key>.txt`, `scripts/indexnow.mjs` |
| Snippets for other sites (Org JSON-LD, footer credit, GitHub README, LinkedIn) | `snippets/` |

Posts with `draft: true` show on the site with a Draft badge but are **excluded** from the sitemap, RSS and search indexing (noindex). Flip to `draft: false` to publish.

## Client reviews (/reviews)

Clients submit reviews through the form on `/reviews`. Each review is saved as **pending** and only appears on the site after you approve it.

One-time setup:
1. Create a free project at https://supabase.com (or reuse an existing one).
2. In the Supabase **SQL Editor**, run `supabase/reviews.sql`.
3. From **Project Settings → API**, copy the project URL and the `anon` public key.
4. Add them as `SUPABASE_URL` and `SUPABASE_ANON_KEY` in Vercel → Settings → Environment Variables (and in `.env.local` for local dev; see `.env.example`). Redeploy.

Approving a review: Supabase → **Table Editor → reviews** → change `status` from `pending` to `approved` (or `rejected`). It shows on `/reviews` and the homepage within about 10 minutes. The reviewer's email is stored so you can confirm they're a real client, but it's never readable from the website.

Until the env vars are set, the page shows "No reviews yet" and the form asks people to email their review instead.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project**, import the repo. Framework is auto-detected (Next.js); no env vars needed.
3. Deploy. Then in **Settings → Domains**, add your domain and follow the DNS instructions (A record / CNAME at your registrar).
4. Set `DOMAIN` in `lib/config.ts` (and in `scripts/indexnow.mjs`) to the real domain **before** the final deploy.

## After deploy (do these once)

1. Fill all `[PLACEHOLDER]` items (see the list in the project handover notes).
2. Add your photo at `public/dobgima-joshua-foncham.jpg`.
3. **Google Search Console** (https://search.google.com/search-console): add the domain property, verify via DNS, submit `https://<domain>/sitemap.xml`, then use *URL Inspection → Request Indexing* for `/`, `/about`, `/faq`.
4. **Bing Webmaster Tools** (https://www.bing.com/webmasters): add the site (you can import from Search Console), submit the sitemap.
5. Run `npm run indexnow` to ping IndexNow with every sitemap URL (repeat after each content update).
6. Validate structured data: paste your URLs into https://search.google.com/test/rich-results and https://validator.schema.org
7. Paste the `snippets/*.jsonld.html` blocks into MotorWise, Home237, YADIMS and WeLearn, and the footer credit on every site you build.
8. Update the GitHub profile README (`snippets/github-profile-README.md` → repo `dobgimajoshua/dobgimajoshua`) and LinkedIn (`snippets/linkedin-about.txt`).
