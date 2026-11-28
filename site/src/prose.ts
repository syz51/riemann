import katex from "katex";

/**
 * Build-time code: vite.config.ts uses it, and no page imports it, so KaTeX
 * does not reach the browser.
 */

/** KaTeX HTML + MathML markup of one display equation. A LaTeX error throws, which stops the build. */
export function equationToHtml(latex: string): string {
  return katex.renderToString(latex, { displayMode: true, throwOnError: true });
}

/** The punctuation marks at the start of the text after a formula; they need no escape. */
const MARKS_AFTER = /^[.,;:!?)"”）。，、；：！？》」』】—]*/;
/** The opening marks at the end of the text before a formula. */
const MARKS_BEFORE = /[("“（《「『【]*$/;

const ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;" };

/**
 * Render top-level inline fractions in display-style sizing (so numerators,
 * denominators, and nested exponents like 1/2^n do not collapse to 50%
 * scriptscriptstyle) while preserving script/scriptscript sizing when a
 * fraction appears inside an exponent or subscript; CSS scales top-level
 * inline `.mfrac` optically to fit running prose.
 */
const INLINE_MACROS = {
  "\\frac":
    "\\mathchoice{\\genfrac{}{}{}{0}{#1}{#2}}{\\genfrac{}{}{}{0}{#1}{#2}}{\\genfrac{}{}{}{2}{#1}{#2}}{\\genfrac{}{}{}{3}{#1}{#2}}",
};

/**
 * HTML of a piece of running text. A formula stands between two `$` signs and
 * becomes inline KaTeX (HTML + MathML). The text around the formulas is escaped.
 * The text cannot hold a dollar sign or a backslash of its own.
 *
 * A browser may break the line between a formula and the punctuation mark
 * after it, or after an opening bracket before it. So a formula and the marks
 * next to it go into one span that does not break.
 */
export function proseToHtml(source: string): string {
  const pieces = source.split("$");
  if (pieces.length % 2 === 0) throw new Error(`A formula is not closed in: ${source}`);
  return pieces
    .map((piece, index) => {
      if (index % 2 === 1) {
        const math = katex.renderToString(piece, {
          displayMode: false,
          throwOnError: true,
          macros: { ...INLINE_MACROS },
        });
        // A mark that follows the formula before this one belongs to that formula.
        const left = pieces[index - 1]!;
        const before = MARKS_BEFORE.exec(index > 1 ? left.replace(MARKS_AFTER, "") : left)![0];
        const after = MARKS_AFTER.exec(pieces[index + 1]!)![0];
        return before || after ? `<span class="nowrap">${before}${math}${after}</span>` : math;
      }
      // The literal is read as raw text, so an escape such as \n would show on the page.
      if (piece.includes("\\")) throw new Error(`A backslash outside a formula in: ${source}`);
      // The marks at the two ends went into the spans of the formulas next to this piece.
      let text = index > 0 ? piece.replace(MARKS_AFTER, "") : piece;
      if (index < pieces.length - 1) text = text.replace(MARKS_BEFORE, "");
      return text.replace(/[&<>]/g, (character) => ESCAPES[character]!);
    })
    .join("");
}

/**
 * The source of one file, with each tex and prose literal replaced by a string
 * of its markup. Line breaks of a literal move behind the string, so every
 * later line keeps its number.
 */
export function replaceLiterals(code: string): string {
  return code.replace(
    /\b(tex|prose)`((?:[^`\\]|\\.)*)`/gs,
    (_, tag: string, source: string) =>
      JSON.stringify(tag === "tex" ? equationToHtml(source) : proseToHtml(source)) +
      "\n".repeat(source.split("\n").length - 1),
  );
}
