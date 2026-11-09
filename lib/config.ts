/**
 * Single source of truth for the site. Change DOMAIN here and everything
 * (canonical URLs, JSON-LD @id, sitemap, RSS, llms.txt links) follows.
 */

// [PLACEHOLDER: replace with your real domain, e.g. "https://dobgimajoshua.com"]
export const DOMAIN = "https://dobgimajoshua.com";

export const PERSON_ID = `${DOMAIN}/#person`;
export const WEBSITE_ID = `${DOMAIN}/#website`;

export const FULL_NAME = "Dobgima Joshua Foncham";
export const ALTERNATE_NAMES = ["Joshua Foncham", "Dobgima Joshua", "KIMMICH"];
export const JOB_TITLE = "Software Engineer";
export const EMAIL = "dobgimajoshua52@gmail.com";
export const LOCATION = {
  city: "Buea",
  region: "South West Region",
  countryCode: "CM",
  countryName: "Cameroon",
};

/** The canonical definition sentence. Used word for word in the About
 *  opening, meta description base, llms.txt and schema description. */
export const DEFINITION_SENTENCE =
  "Dobgima Joshua Foncham is a Cameroonian software engineer based in Buea who builds web, mobile and AI products with Next.js, Flutter, Supabase and Firebase. He is the founder of MotorWise, an AI vehicle maintenance platform, and a graduate of Landmark Metropolitan University Institute (LMUI).";

export const PHOTO_PATH = "/dobgima-joshua-foncham.png";

export const PROFILES = {
  github1: "https://github.com/dobgimajoshua",
  github2: "https://github.com/Dobgim",
  linkedin: "https://www.linkedin.com/in/dobgima-joshua-2291a7301/",
  upwork:
    "https://www.upwork.com/freelancers/~015865bd83a84b1d34?mp_source=share",
  // [PLACEHOLDER: WhatsApp link, e.g. "https://wa.me/2376XXXXXXXX"]
  whatsapp: "",
} as const;

/** All non-empty profile URLs, for sameAs and rel="me" links. */
export const SAME_AS: string[] = Object.values(PROFILES).filter((u) =>
  Boolean(u),
);

export const KNOWS_ABOUT = [
  "Next.js",
  "TypeScript",
  "React",
  "Flutter",
  "Firebase",
  "Supabase",
  "PostgreSQL",
  "AI automation",
  "Software Engineering",
];

export const EDUCATION = {
  degree: "BTech in Software Engineering",
  school: "Landmark Metropolitan University Institute (LMUI)",
  schoolShort: "LMUI",
  city: "Buea",
};

export const EMPLOYER = {
  name: "ConsultStudyBridge",
  description: "An Africa-to-Japan education and travel consultancy",
  role: "Remote IT staff",
};

export const SITE_NAME = `${FULL_NAME} — ${JOB_TITLE}`;
export const HOME_TITLE = `${FULL_NAME} - Software Engineer, Buea, Cameroon`;

export function absoluteUrl(path: string): string {
  return `${DOMAIN}${path.startsWith("/") ? path : `/${path}`}`;
}
