import temml from "temml";

/**
 * Build-time code: vite.config.ts uses it, and no page imports it, so Temml
 * does not reach the browser.
 */

/** MathML markup of one display equation. A LaTeX error throws, which stops the build. */
export function equationToHtml(latex: string): string {
  return temml.renderToString(latex, { displayMode: true, throwOnError: true });
}

/** The punctuation marks at the start of the text after a formula; they need no escape. */
const MARKS_AFTER = /^[.,;:!?)"”]*/;

const ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;" };

/**
 * HTML of a piece of running text. A formula stands between two `$` signs and
 * becomes inline MathML. The text around the formulas is escaped. The text
 * cannot hold a dollar sign or a backslash of its own.
 *
 * A browser may break the line between a formula and the punctuation mark
 * after it. So a formula and the marks that follow it go into one span that
 * does not break.
 */
export function proseToHtml(source: string): string {
  const pieces = source.split("$");
  if (pieces.length % 2 === 0) throw new Error(`A formula is not closed in: ${source}`);
  return pieces
    .map((piece, index) => {
      if (index % 2 === 1) {
        const math = temml.renderToString(piece, { displayMode: false, throwOnError: true });
        const marks = MARKS_AFTER.exec(pieces[index + 1]!)![0];
        return marks ? `<span class="nowrap">${math}${marks}</span>` : math;
      }
      // The literal is read as raw text, so an escape such as \n would show on the page.
      if (piece.includes("\\")) throw new Error(`A backslash outside a formula in: ${source}`);
      // The marks at the start went into the span of the formula before this piece.
      const text = index > 0 ? piece.replace(MARKS_AFTER, "") : piece;
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
