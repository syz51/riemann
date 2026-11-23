/** Markup that the build made from a tex or prose literal. Put it on the page with `innerHTML`. */
type Markup = string & { readonly markup: true };

/**
 * LaTeX for one display equation. The build replaces each call by the MathML
 * markup of the equation (see the plugin in vite.config.ts), so no converter
 * reaches the browser. Write the LaTeX directly in the literal, with no `${}`,
 * and write no such literal inside a comment or a string.
 */
declare function tex(source: TemplateStringsArray): Markup;

/**
 * Running text with formulas. A formula stands between two `$` signs and is
 * LaTeX; the build makes it inline MathML and escapes the text around it. The
 * same rules as for `tex` apply. The text outside the formulas takes no dollar
 * sign and no backslash.
 */
declare function prose(source: TemplateStringsArray): Markup;
