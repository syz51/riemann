import temml from "temml";

/**
 * Build-time code: vite.config.ts uses it, and no page imports it, so Temml
 * does not reach the browser.
 */

/** MathML markup of one display equation. A LaTeX error throws, which stops the build. */
export function equationToHtml(latex: string): string {
  return temml.renderToString(latex, { displayMode: true, throwOnError: true });
}

const ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;" };

/**
 * HTML of a piece of running text. A formula stands between two `$` signs and
 * becomes inline MathML. The text around the formulas is escaped. The text
 * cannot hold a dollar sign or a backslash of its own.
 */
export function proseToHtml(source: string): string {
  const pieces = source.split("$");
  if (pieces.length % 2 === 0) throw new Error(`A formula is not closed in: ${source}`);
  return pieces
    .map((piece, index) => {
      if (index % 2 === 1) {
        return temml.renderToString(piece, { displayMode: false, throwOnError: true });
      }
      // The literal is read as raw text, so an escape such as \n would show on the page.
      if (piece.includes("\\")) throw new Error(`A backslash outside a formula in: ${source}`);
      return piece.replace(/[&<>]/g, (character) => ESCAPES[character]!);
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
