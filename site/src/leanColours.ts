/** The role of a run of Lean text, for colouring. Plain text has no role. */
export type Role = "keyword" | "type" | "number";
export type Run = { text: string; role?: Role };

// A small colouring for the Lean that the steps quote. It is not a Lean parser:
// it knows the declaration keywords, the logic symbols, the sorts and number
// sets, and whole numbers. Add a word here when a new step quotes it.
const PATTERN = /(\b(?:def|theorem|lemma|fun|by|have|at)\b|[∀∃¬])|(\bProp\b|[ℂℝℕℤ])|(\b\d+\b)/g;

export function colourLean(text: string): Run[] {
  const runs: Run[] = [];
  let end = 0;
  for (const match of text.matchAll(PATTERN)) {
    if (match.index > end) runs.push({ text: text.slice(end, match.index) });
    const role: Role = match[1] ? "keyword" : match[2] ? "type" : "number";
    runs.push({ text: match[0], role });
    end = match.index + match[0].length;
  }
  if (end < text.length) runs.push({ text: text.slice(end) });
  return runs;
}
