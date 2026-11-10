/** What Dobgima Joshua Foncham builds, and why it matters to a business.
 *  Single source for /services, the homepage cards, JSON-LD and llms.txt. */

export interface Service {
  slug: string;
  name: string;
  /** Short line for cards. */
  summary: string;
  /** One-sentence direct answer, written to be quoted by answer engines. */
  answer: string;
  why: { title: string; body: string }[];
  deliverables: string[];
  stack: string[];
  example?: { label: string; href: string };
  icon: "web" | "mobile" | "ai";
}

export const services: Service[] = [
  {
    slug: "websites",
    name: "Websites and web applications",
    summary:
      "Fast, professional websites and web apps that help customers find you, trust you and buy from you.",
    answer:
      "A website gives a business a place it fully owns online, where customers can find it on Google and in AI assistants, check that it is trustworthy, and contact it, book or buy at any hour.",
    why: [
      {
        title: "Customers search before they buy",
        body: "People look a business up on Google, Maps and AI assistants like ChatGPT before they call or visit. A well-built website is what those tools find and show.",
      },
      {
        title: "Trust and credibility",
        body: "A clear, professional site with your services, prices and contact details builds more confidence than a social media page alone.",
      },
      {
        title: "It works while you sleep",
        body: "Your website answers common questions, shows your products and takes bookings, orders or enquiries around the clock.",
      },
      {
        title: "You own it",
        body: "Social platforms change their rules. On your own website you control the content, the brand and your customer relationships.",
      },
    ],
    deliverables: [
      "Business websites and landing pages",
      "Online stores, booking and enquiry systems",
      "Web applications, dashboards and client portals",
      "Search setup: fast pages, structured data and sitemaps so Google and AI assistants understand your business",
      "WhatsApp contact buttons and payment integration",
    ],
    stack: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL"],
    example: { label: "Home237, a property rental platform", href: "/projects/home237" },
    icon: "web",
  },
  {
    slug: "mobile-apps",
    name: "Mobile apps",
    summary:
      "Android and iOS apps that keep your business one tap away on your customers' phones.",
    answer:
      "A mobile app puts a business directly on the customer's phone, so it can send notifications, keep people coming back and keep working on slow or unstable connections.",
    why: [
      {
        title: "Your customers live on their phones",
        body: "Most people browse, shop and pay from a phone. An app gives them the fastest, most convenient way to use your service.",
      },
      {
        title: "Bring customers back",
        body: "Push notifications, saved accounts and loyalty features turn one-time visitors into regular customers.",
      },
      {
        title: "Built for real networks",
        body: "Apps can store data on the device and sync when the connection returns, which matters wherever internet is slow or expensive.",
      },
      {
        title: "One codebase, two platforms",
        body: "With Flutter, one app runs on both Android and iOS, which keeps development and maintenance costs lower.",
      },
    ],
    deliverables: [
      "Cross-platform Android and iOS apps built with Flutter",
      "Sign-in, user accounts and real-time data with Firebase or Supabase",
      "Push notifications and offline support",
      "Admin dashboards to manage your app's content and users",
      "Publishing to the Google Play Store and Apple App Store",
    ],
    stack: ["Flutter", "Firebase", "Supabase"],
    icon: "mobile",
  },
  {
    slug: "ai-automation",
    name: "AI and automation",
    summary:
      "Practical AI that saves your team time and answers your customers instantly.",
    answer:
      "AI automation takes repetitive work off a team, such as answering common questions, sorting requests and preparing reports, so a business can respond faster and spend its time on work that needs people.",
    why: [
      {
        title: "Save hours every week",
        body: "Automate the repetitive tasks that eat your day: copying data between tools, sending follow-ups, preparing routine reports.",
      },
      {
        title: "Answer customers instantly",
        body: "An assistant trained on your own business information can answer common questions on your website or WhatsApp, day and night, and hand over to you when needed.",
      },
      {
        title: "Get more from your information",
        body: "AI can summarise documents, sort incoming requests and help your team find answers in your own files quickly.",
      },
      {
        title: "Start small, see results",
        body: "We begin with one task that costs you time today, measure the result, then expand only what works.",
      },
    ],
    deliverables: [
      "AI assistants that answer questions using your business information",
      "Workflow automation connecting forms, email, spreadsheets and WhatsApp",
      "AI features inside your website or app, such as smart search and summaries",
      "Clear advice on where AI helps your business and where it does not",
    ],
    stack: ["Next.js", "Supabase", "AI APIs", "Automation tools"],
    example: { label: "MotorWise, fleet maintenance software", href: "/projects/motorwise" },
    icon: "ai",
  },
];

export const workProcess = [
  {
    title: "Discover",
    body: "We talk on WhatsApp or a call. I learn your business, your customers and the result you want.",
  },
  {
    title: "Plan and design",
    body: "I propose the right solution, the features and a clear plan, then design how it will look and work.",
  },
  {
    title: "Build in stages",
    body: "I build in small steps and share working previews, so you see progress and can give feedback early.",
  },
  {
    title: "Launch and support",
    body: "I launch it, set up search visibility and stay available to improve it as your business grows.",
  },
];
