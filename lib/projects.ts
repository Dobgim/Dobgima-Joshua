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
    tagline: "Fleet maintenance platform for vehicle operators.",
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
      "Live at motorwise.co. [PLACEHOLDER: current status/traction, e.g. pilot customers or active fleets, no numbers invented]",
  },
  {
    slug: "merit-leaders",
    name: "Merit Leaders",
    tagline: "Scholarship and fellowship platform for international students.",
    role: "Developer",
    liveUrl: "https://www.meritleaders.com",
    featured: true,
    schemaType: "SoftwareApplication",
    applicationCategory: "EducationalApplication",
    techStack: ["React", "Vite", "Supabase"],
    problem:
      "Students looking for fully funded scholarships abroad face scattered information and complex applications, and often lack guidance on statements of purpose, visas and interviews.",
    whatIBuilt:
      "Merit Leaders, a platform that helps undergraduate, graduate, postgraduate and international students find, apply for and win fully funded scholarships worldwide, with expert application, SOP, visa and interview support.",
    myRole:
      "Dobgima Joshua Foncham built the Merit Leaders web platform. [PLACEHOLDER: confirm your exact role, e.g. sole developer or co-founder]",
    keyFeatures: [
      "Scholarship and fellowship matching for students at every level",
      "End-to-end application support: SOP, visa and interview preparation",
      "Supabase backend",
    ],
    result: "Live at meritleaders.com.",
  },
  {
    slug: "home237",
    name: "Home237",
    tagline: "Property rental platform for Cameroon.",
    role: "Founder",
    liveUrl: "https://home237.com",
    featured: true,
    schemaType: "SoftwareApplication",
    applicationCategory: "LifestyleApplication",
    techStack: ["Next.js", "TypeScript", "Supabase"],
    problem:
      "Finding rental property in Cameroon is largely informal and offline, making it hard for renters to discover listings and for landlords to reach tenants.",
    whatIBuilt:
      "Home237, a property rental platform for Cameroon where listings can be published and browsed online.",
    myRole:
      "Founder. Dobgima Joshua Foncham founded Home237 and designed, built and deployed the platform.",
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
    role: "Developer",
    liveUrl: "https://yadimsfabrics.com",
    featured: true,
    schemaType: "CreativeWork",
    techStack: ["Next.js", "TypeScript"],
    problem:
      "The fabric and lace business needed an online presence to showcase products and reach customers beyond word of mouth.",
    whatIBuilt:
      "The website for YADIMS Fabrics & Seams, a fabric and lace business, showcasing its products online.",
    myRole: "Dobgima Joshua Foncham designed and developed the website.",
    keyFeatures: [
      "Product showcase for fabrics and lace",
      "Professional business website, designed and built end to end",
    ],
    result: "Live at yadimsfabrics.com.",
  },
  {
    slug: "foodieexpress",
    name: "FoodieExpress",
    tagline: "Online food ordering and delivery store.",
    role: "Developer",
    liveUrl: "https://foodieexpress-react.vercel.app",
    featured: false,
    schemaType: "SoftwareApplication",
    applicationCategory: "ShoppingApplication",
    techStack: ["React", "Framer Motion"],
    problem:
      "Restaurants and food vendors need a simple way for hungry customers to browse a menu and order online, on any device.",
    whatIBuilt:
      "FoodieExpress, a food ordering website where customers browse meals, fast food, drinks and desserts and place orders for delivery.",
    myRole:
      "Dobgima Joshua Foncham built the FoodieExpress storefront in React, including the menu catalogue, cart experience and animated interface.",
    keyFeatures: [
      "Menu catalogue for meals, fast food, drinks and desserts",
      "Shopping cart and ordering flow",
      "Smooth, mobile-first animated interface with Framer Motion",
    ],
    result: "Live on Vercel.",
  },
  {
    slug: "cushman-golf-carts",
    name: "Cushman Golf Carts SA",
    tagline: "Golf cart sales, hire and parts website for a South African dealer.",
    role: "Developer, SEO & maintenance",
    liveUrl: "https://cushmancarts.co.za",
    featured: false,
    schemaType: "CreativeWork",
    techStack: ["React", "PHP", "Hostinger", "SEO"],
    problem:
      "A golf cart dealer in Bloemfontein needed a professional online showroom to reach buyers and hire customers across South Africa, and to turn visitors into enquiries.",
    whatIBuilt:
      "The website for Cushman Golf Carts SA, presenting new and used electric and petrol golf carts for sale and hire, plus spare parts, batteries, repairs and nationwide delivery.",
    myRole:
      "Dobgima Joshua Foncham designed and developed the website, deployed it on Hostinger, and runs its SEO and ongoing maintenance, including the enquiry form that delivers customer messages by email.",
    keyFeatures: [
      "Showroom for new and used electric and petrol golf carts",
      "Sale and hire options, spare parts, batteries and repairs",
      "Quote and financing enquiries through a PHP contact form with email delivery",
      "WhatsApp contact and nationwide delivery information",
      "SEO for South African search: page titles, descriptions and structured content for golf cart sales and hire",
      "Ongoing maintenance: updates, fixes and keeping the site fast and online",
    ],
    result: "Live at cushmancarts.co.za, with SEO and maintenance ongoing.",
  },
  {
    slug: "logistics-tracking-platform",
    name: "Logistics Tracking Platform",
    tagline: "Logistics websites with live shipment tracking, quotes and an admin dashboard.",
    role: "Developer",
    liveUrl: null,
    liveUrlNote: "Built for logistics businesses. A walkthrough or demo is available on request.",
    featured: false,
    schemaType: "SoftwareApplication",
    applicationCategory: "BusinessApplication",
    techStack: ["React", "Vite", "Tailwind CSS", "Supabase", "WordPress", "WooCommerce"],
    problem:
      "Logistics and freight businesses need customers to track shipments on their own, request quotes and see delivery progress, while staff need one place to create shipments and keep every status up to date.",
    whatIBuilt:
      "Logistics platforms with a public tracking page, a route map showing each shipment's journey, quote and fee requests, and an admin dashboard for managing shipments. Built both as a custom React and Supabase application and as a WordPress and WooCommerce site.",
    myRole:
      "Dobgima Joshua Foncham designed and developed the platforms end to end: the customer-facing website, the tracking experience, the admin dashboard and the database.",
    keyFeatures: [
      "Public tracking by shipment code, with a route map of the journey",
      "Status workflow: Pending, Picked Up, In Transit, Out for Delivery, Delivered and On Hold",
      "Admin dashboard to create shipments and update status, location and details",
      "Printable PDF shipment invoices with barcodes and QR codes",
      "Quote requests, fee calculation and service pages for freight, warehousing and e-commerce fulfilment",
      "Supabase database for shipments and settings",
    ],
    result: "Delivered for logistics businesses; client sites are not linked here.",
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
