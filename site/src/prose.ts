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
 * becomes inline MathML. The text around the formulas is escaped.
 */
export function proseToHtml(source: string): string {
  const pieces = source.split("$");
  if (pieces.length % 2 === 0) throw new Error(`A formula is not closed in: ${source}`);
  return pieces
    .map((piece, index) =>
      index % 2 === 1
        ? temml.renderToString(piece, { displayMode: false, throwOnError: true })
        : piece.replace(/[&<>]/g, (character) => ESCAPES[character]!),
    )
    .join("");
}
