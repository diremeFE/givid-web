// Product descriptions are a single free-text block, but some sentences are
// really operational notices (minimum order, etc.) that should stand out
// visually instead of blending into the regular description copy. This pulls
// those sentences out so the page can render them as a highlighted alert.
const ALERT_KEYWORDS = ["mínimo", "mínima", "minimum", "minimale"];

export function splitProductAlert(description: string): { text: string; alert: string | null } {
  const sentences = description
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const alertSentences = sentences.filter((s) =>
    ALERT_KEYWORDS.some((k) => s.toLowerCase().includes(k)),
  );
  const textSentences = sentences.filter((s) => !alertSentences.includes(s));

  return {
    text: textSentences.join(" "),
    alert: alertSentences.length > 0 ? alertSentences.join(" ") : null,
  };
}
