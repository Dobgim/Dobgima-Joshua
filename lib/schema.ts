import {
  ALTERNATE_NAMES,
  DEFINITION_SENTENCE,
  DOMAIN,
  EDUCATION,
  EMAIL,
  EMPLOYER,
  FULL_NAME,
  HOME_TITLE,
  JOB_TITLE,
  KNOWS_ABOUT,
  LOCATION,
  PERSON_ID,
  PHONE,
  PHOTO_PATH,
  SAME_AS,
  SECOND_CITY,
  SITE_UPDATED,
  WEBSITE_ID,
  absoluteUrl,
} from "./config";
import type { Project } from "./projects";
import type { PostMeta } from "./blog";
import { services, type Service } from "./services";

type JsonLd = Record<string, unknown>;

/** Full Person entity — used once on the homepage. */
export function personSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: FULL_NAME,
    alternateName: ALTERNATE_NAMES,
    url: DOMAIN,
    image: absoluteUrl(PHOTO_PATH),
    jobTitle: JOB_TITLE,
    description: DEFINITION_SENTENCE,
    email: `mailto:${EMAIL}`,
    telephone: PHONE,
    address: {
      "@type": "PostalAddress",
      addressLocality: LOCATION.city,
      addressRegion: LOCATION.region,
      addressCountry: LOCATION.countryCode,
    },
    workLocation: [
      {
        "@type": "Place",
        name: `${LOCATION.city}, ${LOCATION.countryName}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: LOCATION.city,
          addressRegion: LOCATION.region,
          addressCountry: LOCATION.countryCode,
        },
      },
      {
        "@type": "Place",
        name: `${SECOND_CITY.city}, ${LOCATION.countryName}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: SECOND_CITY.city,
          addressRegion: SECOND_CITY.region,
          addressCountry: LOCATION.countryCode,
        },
      },
    ],
    nationality: {
      "@type": "Country",
      name: LOCATION.countryName,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: EDUCATION.school,
      address: {
        "@type": "PostalAddress",
        addressLocality: EDUCATION.city,
        addressCountry: LOCATION.countryCode,
      },
    },
    worksFor: {
      "@type": "Organization",
      name: EMPLOYER.name,
      description: EMPLOYER.description,
    },
    founder: [
      {
        "@type": "Organization",
        name: "MotorWise",
        url: "https://www.motorwise.co",
      },
      {
        "@type": "Organization",
        name: "YADIMS Fabrics & Seams",
        url: "https://yadimsfabrics.com",
      },
    ],
    knowsAbout: KNOWS_ABOUT,
    hasOccupation: {
      "@type": "Occupation",
      name: JOB_TITLE,
      occupationLocation: { "@type": "Country", name: LOCATION.countryName },
      skills: KNOWS_ABOUT.join(", "),
    },
    makesOffer: services.map((svc) => ({
      "@type": "Offer",
      itemOffered: { "@id": serviceId(svc) },
    })),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "business inquiries",
      telephone: PHONE,
      email: EMAIL,
      url: absoluteUrl("/contact"),
    },
    sameAs: SAME_AS,
  };
}

/** Minimal reference to the Person by @id, for use on inner pages. */
export function personRef(): JsonLd {
  return { "@id": PERSON_ID };
}

export function webSiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: DOMAIN,
    name: HOME_TITLE,
    description: DEFINITION_SENTENCE,
    publisher: personRef(),
    inLanguage: "en",
  };
}

export function profilePageSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${DOMAIN}/about#profilepage`,
    url: absoluteUrl("/about"),
    name: `About ${FULL_NAME}`,
    mainEntity: personRef(),
    isPartOf: { "@id": WEBSITE_ID },
    dateModified: SITE_UPDATED,
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqPageSchema(items: FaqItem[], path = "/faq"): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faqpage`,
    url: absoluteUrl(path),
    about: personRef(),
    dateModified: SITE_UPDATED,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function blogPostingSchema(post: PostMeta): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${DOMAIN}/blog/${post.slug}#post`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: absoluteUrl(`/blog/${post.slug}`),
    author: personRef(),
    publisher: personRef(),
    keywords: post.tags.join(", "),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    inLanguage: "en",
  };
}

export function projectSchema(project: Project): JsonLd {
  const base: JsonLd = {
    "@context": "https://schema.org",
    "@type": project.schemaType,
    "@id": `${DOMAIN}/projects/${project.slug}#work`,
    name: project.name,
    description: `${project.tagline} ${project.whatIBuilt}`,
    url: project.liveUrl ?? absoluteUrl(`/projects/${project.slug}`),
    creator: personRef(),
    author: personRef(),
    keywords: project.techStack.join(", "),
  };
  if (project.schemaType === "SoftwareApplication") {
    base.applicationCategory = project.applicationCategory ?? "WebApplication";
    base.operatingSystem = "Web";
  }
  return base;
}

export function serviceId(svc: Service): string {
  return `${DOMAIN}/services#${svc.slug}`;
}

/** One Service entity per offering, provided by the Person. */
export function servicesSchema(): JsonLd[] {
  return services.map((svc) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId(svc),
    name: svc.name,
    serviceType: svc.name,
    description: `${svc.answer} ${svc.summary}`,
    url: `${absoluteUrl("/services")}#${svc.slug}`,
    provider: personRef(),
    areaServed: [
      { "@type": "Country", name: LOCATION.countryName },
      { "@type": "Place", name: "Worldwide (remote)" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: svc.name,
      itemListElement: svc.deliverables.map((d) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: d },
      })),
    },
  }));
}

/** Generic page entity: tells engines what the page is, who it is about and when it changed. */
export function webPageSchema(opts: {
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "FAQPage";
  path: string;
  name: string;
  description: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "WebPage",
    "@id": `${absoluteUrl(opts.path)}#webpage`,
    url: absoluteUrl(opts.path),
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: personRef(),
    author: personRef(),
    dateModified: SITE_UPDATED,
    inLanguage: "en",
  };
}

export function projectListSchema(items: Project[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Projects by ${FULL_NAME}`,
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/projects/${p.slug}`),
      name: p.name,
    })),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
