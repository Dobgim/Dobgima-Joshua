import {
  ALTERNATE_NAMES,
  DEFINITION_SENTENCE,
  EDUCATION,
  EMAIL,
  EMPLOYER,
  FULL_NAME,
  LOCATIONS_LABEL,
  PHONE_DISPLAY,
  PROFILES,
  SITE_UPDATED,
  WHATSAPP_URL,
  absoluteUrl,
} from "./config";
import { faqItems } from "./faq";
import { projects } from "./projects";
import { services } from "./services";
import { servicesFaq } from "./services-faq";

const clean = (s: string) => s.replace(/\s*\[PLACEHOLDER:[^\]]*\]/g, "").trim();

function header(): string[] {
  return [
    `# ${FULL_NAME}`,
    "",
    `> ${DEFINITION_SENTENCE}`,
    "",
    `- Also known as: ${ALTERNATE_NAMES.join(", ")}`,
    `- Role: Software Engineer, ${LOCATIONS_LABEL}`,
    `- Education: ${EDUCATION.degree}, ${EDUCATION.school}`,
    `- Work: ${EMPLOYER.role} at ${EMPLOYER.name} (${EMPLOYER.description.charAt(0).toLowerCase() + EMPLOYER.description.slice(1)})`,
    `- Founder of: MotorWise, YADIMS Fabrics & Seams`,
    `- WhatsApp: ${PHONE_DISPLAY} (${WHATSAPP_URL.split("?")[0]})`,
    `- Email: ${EMAIL}`,
    `- Last updated: ${SITE_UPDATED}`,
  ];
}

function profiles(): string[] {
  return [
    "## Profiles",
    "",
    `- GitHub: ${PROFILES.github1} and ${PROFILES.github2}`,
    `- LinkedIn: ${PROFILES.linkedin}`,
    `- Upwork: ${PROFILES.upwork.split("?")[0]}`,
  ];
}

function keyPages(): string[] {
  return [
    "## Key pages",
    "",
    `- [About](${absoluteUrl("/about")}): full profile and key facts`,
    `- [Services](${absoluteUrl("/services")}): websites, mobile apps and AI automation, and why each matters`,
    `- [Projects](${absoluteUrl("/projects")}): case studies`,
    `- [FAQ](${absoluteUrl("/faq")}): direct answers about ${FULL_NAME}`,
    `- [Reviews](${absoluteUrl("/reviews")}): verified client reviews`,
    `- [Contact](${absoluteUrl("/contact")}): how to hire him`,
  ];
}

/** Short summary for /llms.txt. */
export function llmsTxt(): string {
  return [
    ...header(),
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.name}](${absoluteUrl(`/services#${s.slug}`)}): ${s.summary}`),
    "",
    "## Projects",
    "",
    ...projects.map(
      (p) => `- [${p.name}](${p.liveUrl ?? absoluteUrl(`/projects/${p.slug}`)}): ${p.role}. ${p.tagline}`,
    ),
    "",
    ...keyPages(),
    "",
    ...profiles(),
    "",
  ].join("\n");
}

/** Full content for /llms-full.txt. */
export function llmsFullTxt(): string {
  return [
    ...header(),
    "",
    "## Services",
    ...services.flatMap((s) => [
      "",
      `### ${s.name}`,
      "",
      s.answer,
      "",
      "Why it matters:",
      ...s.why.map((w) => `- ${w.title}: ${w.body}`),
      "",
      "What is delivered:",
      ...s.deliverables.map((d) => `- ${d}`),
      "",
      `Built with: ${s.stack.join(", ")}`,
    ]),
    "",
    "## Projects",
    ...projects.flatMap((p) => [
      "",
      `### ${p.name}${p.liveUrl ? ` (${p.liveUrl})` : ""}`,
      "",
      `Role: ${p.role}. ${p.tagline}`,
      `Problem: ${clean(p.problem)}`,
      `What was built: ${clean(p.whatIBuilt)}`,
      `Tech stack: ${p.techStack.join(", ")}`,
      `Status: ${clean(p.result)}`,
      `Case study: ${absoluteUrl(`/projects/${p.slug}`)}`,
    ]),
    "",
    "## Frequently asked questions",
    ...[...faqItems, ...servicesFaq].flatMap((f) => ["", `### ${f.question}`, "", f.answer]),
    "",
    ...keyPages(),
    "",
    ...profiles(),
    "",
  ].join("\n");
}
