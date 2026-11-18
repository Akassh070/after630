/**
 * Renders schema.org structured data as a JSON-LD <script>, per the Next.js
 * JSON-LD guide: `<` is escaped so a string in the data can't close the tag.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
