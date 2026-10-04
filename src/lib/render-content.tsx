/**
 * Minimal markdown-lite renderer shared by the blog and the legal pages.
 * Supports "## " / "### " headings, "- " bullet lists, plain paragraphs
 * (separated by blank lines), and inline "[text](/path)" links.
 */
function renderInline(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (!match) return part;
    const [, label, href] = match;
    return (
      <a key={i} href={href} className="font-semibold text-brand-dark underline underline-offset-2">
        {label}
      </a>
    );
  });
}

export function renderContent(content: string) {
  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, i) => {
      if (block.startsWith("### ")) {
        return (
          <h3 key={i} className="mt-6 text-lg font-bold text-neutral-900">
            {renderInline(block.slice(4))}
          </h3>
        );
      }
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="mt-8 text-xl font-black text-neutral-900 sm:text-2xl">
            {renderInline(block.slice(3))}
          </h2>
        );
      }
      const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
      if (lines.length > 0 && lines.every((l) => l.startsWith("- "))) {
        return (
          <ul key={i} className="mt-3 list-disc space-y-1.5 pl-5 text-neutral-600">
            {lines.map((item) => (
              <li key={item}>{renderInline(item.slice(2))}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={i} className="mt-3 leading-relaxed text-neutral-600">
          {renderInline(block)}
        </p>
      );
    });
}

/**
 * Extracts "### question" + following paragraph pairs as FAQ entries,
 * so posts written with that pattern can also emit FAQPage schema.
 */
export function extractFaq(content: string): { question: string; answer: string }[] {
  const blocks = content
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  const faq: { question: string; answer: string }[] = [];
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].startsWith("### ")) {
      const answer = blocks[i + 1];
      if (answer && !answer.startsWith("#")) {
        faq.push({ question: blocks[i].slice(4), answer });
      }
    }
  }
  return faq;
}
