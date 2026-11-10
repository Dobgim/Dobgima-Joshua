/**
 * Single source of truth for the site. Change DOMAIN here and everything
 * (canonical URLs, JSON-LD @id, sitemap, RSS, llms.txt links) follows.
 */

// Live domain. Change only here (and in scripts/indexnow.mjs).
export const DOMAIN = "https://www.dobgimajoshua.dev";

/** Bump when content changes; shown as "Last updated" and used as dateModified. */
export const SITE_UPDATED = "2026-11-10";

export const PERSON_ID = `${DOMAIN}/#person`;
export const WEBSITE_ID = `${DOMAIN}/#website`;

export const FULL_NAME = "Dobgima Joshua Foncham";
export const ALTERNATE_NAMES = ["Joshua Foncham", "Dobgima Joshua"];
export const JOB_TITLE = "Software Engineer";
export const EMAIL = "dobgimajoshua52@gmail.com";
export const PHONE = "+237681047097";
export const PHONE_DISPLAY = "+237 681 047 097";
export const LOCATION = {
  city: "Buea",
  region: "South West Region",
  countryCode: "CM",
  countryName: "Cameroon",
};
/** Other city he works from. */
export const SECOND_CITY = { city: "Yaoundé", region: "Centre Region" };
export const LOCATIONS_LABEL = "Buea & Yaoundé, Cameroon";

/** The canonical definition sentence. Used word for word in the About
 *  opening, meta description base, llms.txt and schema description. */
export const DEFINITION_SENTENCE =
  "Dobgima Joshua Foncham is a Cameroonian software engineer based in Buea who builds web, mobile and AI products with Next.js, Flutter, Supabase and Firebase. He is the founder of MotorWise, an AI vehicle maintenance platform, and a graduate of Landmark Metropolitan University Institute (LMUI).";

export const PHOTO_PATH = "/dobgima-joshua-foncham.png";

const WHATSAPP_MESSAGE =
  "Hello Joshua, I found your website and I'd like to work with you on a project.";
export const WHATSAPP_URL = `https://wa.me/${PHONE.replace("+", "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const PROFILES = {
  github1: "https://github.com/dobgimajoshua",
  github2: "https://github.com/Dobgim",
  linkedin: "https://www.linkedin.com/in/dobgima-joshua-2291a7301/",
  upwork:
    "https://www.upwork.com/freelancers/~015865bd83a84b1d34?mp_source=share",
} as const;

/** Identity profiles, for sameAs and rel="me" links. */
export const SAME_AS: string[] = Object.values(PROFILES);

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

/** Stack shown in visible copy on the homepage. */
export const CORE_STACK = ["Next.js", "TypeScript", "React", "Flutter", "Supabase", "Firebase"];

export const EDUCATION = {
  degree: "BTech in Software Engineering",
  school: "Landmark Metropolitan University Institute (LMUI)",
  schoolShort: "LMUI",
  city: "Buea",
};

/** Personal details provided by Dobgima Joshua Foncham for his public profile. */
export const BIRTH_DATE = "2004-08-12";
export const BIRTH_DATE_DISPLAY = "12 August 2004";
export const SECONDARY_SCHOOL = {
  name: "St Joseph Comprehensive College",
  city: "Douala",
  completed: 2023,
};

export const EMPLOYER = {
  name: "ConsultStudyBridge",
  description: "An Africa-to-Japan education and travel consultancy",
  role: "Remote IT staff",
};

export const SITE_NAME = `${FULL_NAME}, ${JOB_TITLE}`;
export const HOME_TITLE = `${FULL_NAME} - Software Engineer, Buea, Cameroon`;

export function absoluteUrl(path: string): string {
  return `${DOMAIN}${path.startsWith("/") ? path : `/${path}`}`;
}
