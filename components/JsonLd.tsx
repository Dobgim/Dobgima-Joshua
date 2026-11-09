/**
 * Renders one or more JSON-LD blocks as <script type="application/ld+json">.
 * Server component — the structured data is in the static HTML, so crawlers
 * that don't run JavaScript still read it.
 */
export default function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify of our own build-time data; escape "<" defensively.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
