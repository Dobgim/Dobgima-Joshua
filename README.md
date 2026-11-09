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
