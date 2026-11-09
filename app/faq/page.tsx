import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { FULL_NAME } from "@/lib/config";
import { faqItems } from "@/lib/faq";
import { faqPageSchema } from "@/lib/schema";

const description = `Frequently asked questions about ${FULL_NAME}: who he is, what he does, MotorWise, his technologies, education and how to hire him.`;

export const metadata: Metadata = {
  title: "FAQ",
  description,
  alternates: { canonical: "/faq" },
  openGraph: { title: `FAQ about ${FULL_NAME}`, description, url: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(faqItems)} />
      <Breadcrumbs
        crumbs={[
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]}
      />
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        Frequently asked questions about {FULL_NAME}
      </h1>
      <dl className="mt-8 max-w-3xl space-y-8">
        {faqItems.map((item) => (
          <div key={item.question}>
            <dt className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {item.question}
            </dt>
            <dd className="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-400">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        More on the{" "}
        <Link
          href="/about"
          className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
        >
          about page
        </Link>{" "}
        and the{" "}
        <Link
          href="/projects"
          className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
        >
          projects page
        </Link>
        .
      </p>
    </>
  );
}
