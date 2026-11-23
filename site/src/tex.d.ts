/**
 * LaTeX for one display equation. The build replaces each call by the MathML
 * markup of the equation (see the plugin in vite.config.ts), so no converter
 * reaches the browser. Write the LaTeX directly in the literal, with no `${}`.
 */
declare function tex(source: TemplateStringsArray): string;
