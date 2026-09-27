/**
 * Minimal markdown-lite renderer shared by the blog and the legal pages.
 * Supports "## " / "### " headings, "- " bullet lists, and plain paragraphs,
 * separated by blank lines.
 */
export function renderContent(content: string) {
  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, i) => {
      if (block.startsWith("### ")) {
        return (
          <h3 key={i} className="mt-6 text-lg font-bold text-neutral-900">
            {block.slice(4)}
          </h3>
        );
      }
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="mt-8 text-xl font-black text-neutral-900 sm:text-2xl">
            {block.slice(3)}
          </h2>
        );
      }
      const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
      if (lines.length > 0 && lines.every((l) => l.startsWith("- "))) {
        return (
          <ul key={i} className="mt-3 list-disc space-y-1.5 pl-5 text-neutral-600">
            {lines.map((item) => (
              <li key={item}>{item.slice(2)}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={i} className="mt-3 leading-relaxed text-neutral-600">
          {block}
        </p>
      );
    });
}
