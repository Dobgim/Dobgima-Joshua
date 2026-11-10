import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/config";
import { projects } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/projects"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/faq"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/reviews"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: absoluteUrl(`/projects/${p.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Drafts are excluded until published (draft: false in frontmatter).
  const postPages: MetadataRoute.Sitemap = getAllPosts()
    .filter((p) => !p.draft)
    .map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.date),
      changeFrequency: "yearly",
      priority: 0.6,
    }));

  return [...staticPages, ...projectPages, ...postPages];
}
