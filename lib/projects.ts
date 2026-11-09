export interface Project {
  slug: string;
  name: string;
  tagline: string;
  role: string;
  liveUrl: string | null;
  liveUrlNote?: string;
  featured: boolean;
  /** "SoftwareApplication" gets SoftwareApplication JSON-LD, otherwise CreativeWork. */
  schemaType: "SoftwareApplication" | "CreativeWork";
  applicationCategory?: string;
  techStack: string[];
  problem: string;
  whatIBuilt: string;
  myRole: string;
  keyFeatures: string[];
  result: string;
}

export const projects: Project[] = [
  {
    slug: "motorwise",
    name: "MotorWise",
    tagline: "AI Fleet Maintenance Copilot — an AI vehicle maintenance platform.",
    role: "Founder",
    liveUrl: "https://www.motorwise.co",
    featured: true,
    schemaType: "SoftwareApplication",
    applicationCategory: "BusinessApplication",
    techStack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    problem:
      "Fleet operators struggle to keep track of vehicle maintenance across many vehicles and drivers, which leads to missed servicing and avoidable breakdowns.",
    whatIBuilt:
      "MotorWise, an AI vehicle maintenance copilot delivered as a multi-tenant SaaS for fleet operators. Each operator's data is isolated at the database level using Supabase PostgreSQL with Row-Level Security.",
    myRole:
      "Founder. Dobgima Joshua Foncham designed and built the product, including the multi-tenant data model and the application itself.",
    keyFeatures: [
      "Multi-tenant SaaS architecture for fleet operators",
      "Tenant isolation with Supabase PostgreSQL Row-Level Security (RLS)",
      "AI-assisted vehicle maintenance guidance",
    ],
    result:
      "Live at motorwise.co. [PLACEHOLDER: current status/traction, e.g. pilot customers or active fleets — no numbers invented]",
  },
  {
    slug: "home237",
    name: "Home237",
    tagline: "Property rental platform for Cameroon.",
    role: "Builder & developer",
    liveUrl: "https://home237.com",
    featured: true,
    schemaType: "SoftwareApplication",
    applicationCategory: "LifestyleApplication",
    techStack: ["Next.js", "TypeScript", "Supabase"],
    problem:
      "Finding rental property in Cameroon is largely informal and offline, making it hard for renters to discover listings and for landlords to reach tenants.",
    whatIBuilt:
      "Home237, a property rental platform for Cameroon where listings can be published and browsed online.",
    myRole: "Dobgima Joshua Foncham built and deployed the platform.",
    keyFeatures: [
      "Online property listings for the Cameroonian market",
      "Deployed and running in production",
    ],
    result: "Live at home237.com. [PLACEHOLDER: current status, e.g. number of listings or cities covered]",
  },
  {
    slug: "yadims-fabrics",
    name: "YADIMS Fabrics & Seams",
    tagline: "E-commerce website for a fabric and lace business.",
    role: "Founder & developer",
    liveUrl: "https://yadimsfabrics.com",
    featured: true,
    schemaType: "CreativeWork",
    techStack: ["Next.js", "TypeScript"],
    problem:
      "The fabric and lace business needed an online presence to showcase products and reach customers beyond word of mouth.",
    whatIBuilt:
      "The website for YADIMS Fabrics & Seams, the fabric and lace business founded by Dobgima Joshua Foncham.",
    myRole: "Founder of the business and developer of the website.",
    keyFeatures: [
      "Product showcase for fabrics and lace",
      "Business website built and maintained by the founder",
    ],
    result: "Live at yadimsfabrics.com.",
  },
  {
    slug: "welearn",
    name: "WeLearn",
    tagline: "EdTech startup for Cameroon.",
    role: "Co-founder",
    liveUrl: "https://welearncm.org",
    featured: false,
    schemaType: "SoftwareApplication",
    applicationCategory: "EducationalApplication",
    techStack: ["Next.js", "TypeScript"],
    problem:
      "Students in Cameroon need better access to learning resources and tools online.",
    whatIBuilt:
      "WeLearn, an EdTech startup that Dobgima Joshua Foncham is co-building with a colleague.",
    myRole: "Co-founder and engineer, building the product with a colleague.",
    keyFeatures: ["EdTech platform in active development"],
    result:
      "In progress at welearncm.org. [PLACEHOLDER: current stage, e.g. beta, pilot schools]",
  },
  {
    slug: "school-management-system",
    name: "School Management System",
    tagline: "Management software for schools in Cameroon.",
    role: "Developer",
    liveUrl: null,
    liveUrlNote: "[PLACEHOLDER: live URL of the School Management System]",
    featured: false,
    schemaType: "SoftwareApplication",
    applicationCategory: "BusinessApplication",
    techStack: ["React", "Node.js", "PostgreSQL"],
    problem:
      "Schools in Cameroon often manage students, grades and administration on paper or in spreadsheets, which is slow and error-prone.",
    whatIBuilt:
      "A school management system built by Dobgima Joshua Foncham for schools in Cameroon.",
    myRole: "Designed and developed the system.",
    keyFeatures: [
      "Student and class administration",
      "Built for the needs of schools in Cameroon",
    ],
    result: "Built and delivered. [PLACEHOLDER: deployment status and live URL]",
  },
  {
    slug: "booking-system",
    name: "Booking System (demo)",
    tagline: "A booking system demo application.",
    role: "Developer",
    liveUrl: "https://booking-system-umber-six.vercel.app",
    featured: false,
    schemaType: "SoftwareApplication",
    applicationCategory: "BusinessApplication",
    techStack: ["Next.js", "TypeScript"],
    problem:
      "A demonstration of booking and reservation flows, built to show how a booking product can work end to end.",
    whatIBuilt: "A booking system demo deployed on Vercel.",
    myRole: "Dobgima Joshua Foncham designed and built the demo.",
    keyFeatures: ["End-to-end booking flow demo", "Deployed on Vercel"],
    result: "Live demo on Vercel.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);
