import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  DEFINITION_SENTENCE,
  DOMAIN,
  FULL_NAME,
  HOME_TITLE,
} from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  title: {
    default: HOME_TITLE,
    template: `%s | ${FULL_NAME}`,
  },
  description: DEFINITION_SENTENCE,
  authors: [{ name: FULL_NAME, url: DOMAIN }],
  creator: FULL_NAME,
  openGraph: {
    type: "website",
    siteName: FULL_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/** Applies the saved theme before first paint to avoid a flash. */
const themeScript = `
try {
  document.documentElement.classList.remove('no-js');
  var t = localStorage.getItem('theme');
  if (t === 'dark') {
    document.documentElement.classList.add('dark');
  }
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="no-js" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col overflow-x-clip bg-white text-zinc-800 antialiased dark:bg-zinc-950 dark:text-zinc-200">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-sky-700 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
