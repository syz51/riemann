import { expect, test } from "vite-plus/test";
import { equationToHtml, proseToHtml, replaceLiterals } from "./prose";

test("text without a formula is escaped and has no math element", () => {
  expect(proseToHtml("Cut & paste <b>")).toBe("Cut &amp; paste &lt;b&gt;");
});

test("a formula becomes inline KaTeX between the pieces of text", () => {
  const html = proseToHtml("The term is $\\frac{1}{n^2}$ here.");
  expect(html.startsWith('The term is <span class="katex">')).toBe(true);
  expect(html.endsWith("</span> here.")).toBe(true);
  expect(html).toContain("<mfrac>");
  expect(html).toContain("<msup>");
  expect(html).not.toContain("katex-display");
  // Inline fractions use display-style sizing so nested exponents do not collapse to size1 (50%).
  expect(html).not.toContain("size1");
});

test("a fraction inside an inline exponent keeps script-level sizing", () => {
  const html = proseToHtml("factor $\\pi^{-\\frac{s}{2}}$ here");
  expect(html).toContain("<msup>");
  expect(html).toContain("<mfrac>");
  // Unlike a top-level inline fraction, the script-level fraction must not be forced up to display size.
  expect(html).toContain("reset-size3 size1");
});

test("a formula and the marks after it are in one span that does not break", () => {
  const html = proseToHtml("It is $x$, and ($y$). Then $z$ is next.");
  expect(html).toMatch(
    /^It is <span class="nowrap"><span class="katex">.*?<\/span>,<\/span> and <span class="nowrap">\(<span class="katex">/,
  );
  expect(html).toMatch(/<\/span>\)\.<\/span> Then <span class="katex">/);
  expect(html.endsWith("</span> is next.")).toBe(true);
});

test("Chinese punctuation next to a formula stays in the same nowrap span", () => {
  const html = proseToHtml("也就是说，当（$x$）大于 $1$。");
  expect(html).toMatch(
    /^也就是说，当<span class="nowrap">（<span class="katex">.*?<\/span>）<\/span>大于 <span class="nowrap"><span class="katex">.*?<\/span>。<\/span>$/,
  );
});

test("a mark between two formulas shows one time", () => {
  const text = proseToHtml('$x$"$y$').replace(/<[^>]*>/g, "");
  expect(text.split('"').length).toBe(2);
});

test("an unclosed formula stops the build", () => {
  expect(() => proseToHtml("The term is $1/n^2 here.")).toThrow("not closed");
});

test("a LaTeX error stops the build", () => {
  expect(() => proseToHtml("$\\frac{1}$")).toThrow();
});

test("a display equation is a block", () => {
  const html = equationToHtml("x = 1");
  expect(html).toContain('class="katex-display"');
  expect(html).toContain('display="block"');
});

test("a backslash outside a formula stops the build", () => {
  expect(() => proseToHtml("one\\ntwo")).toThrow("backslash");
});

// The literals are built from pieces here: the plugin would replace a whole one in this file.
const TICK = "`";

test("the plugin replaces a tex literal by a display equation", () => {
  const out = replaceLiterals(`const a = tex${TICK}x^2${TICK};`);
  expect(out).toContain("katex-display");
  expect(out).not.toContain("tex" + TICK);
});

test("the plugin replaces a prose literal by inline markup and keeps the line count", () => {
  const code = `const a = prose${TICK}One $x$\n  and two.${TICK};\nconst b = 1;`;
  const out = replaceLiterals(code);
  expect(out).toContain('One <span class=\\"katex\\"');
  expect(out).not.toContain("katex-display");
  expect(out.split("\n").length).toBe(code.split("\n").length);
  expect(out.endsWith("const b = 1;")).toBe(true);
});

const SOURCES = import.meta.glob<string>(["./**/*.{ts,tsx}", "!./**/*.test.ts"], {
  query: "?raw",
  import: "default",
  eager: true,
});
const RAW_MATH_GLYPHS = /[√∛²³⁴∀ℂℕΓζπ]/;

test("site source files use stacked \\frac fractions and LaTeX math symbols in every prose/tex literal", () => {
  expect(Object.keys(SOURCES).length).toBeGreaterThan(5);
  let literalsChecked = 0;
  const violations: string[] = [];
  for (const [file, text] of Object.entries(SOURCES)) {
    for (const match of text.matchAll(/\b(prose|tex)`((?:[^`\\]|\\.)*)`/gs)) {
      literalsChecked++;
      const [, tag, body] = match;
      const line = text.slice(0, match.index).split("\n").length;
      if (tag === "tex") {
        if (body!.includes("/")) violations.push(`${file}:${line} tex uses '/' instead of \\frac`);
      } else {
        const pieces = body!.split("$");
        for (let i = 0; i < pieces.length; i++) {
          if (i % 2 === 1 && pieces[i]!.includes("/")) {
            violations.push(
              `${file}:${line} inline formula uses '/' instead of \\frac: $${pieces[i]}$`,
            );
          }
          if (i % 2 === 0 && RAW_MATH_GLYPHS.test(pieces[i]!)) {
            violations.push(
              `${file}:${line} prose text uses raw math glyph outside $...$: ${pieces[i]}`,
            );
          }
        }
      }
    }
  }
  expect(literalsChecked).toBeGreaterThan(50);
  expect(violations).toEqual([]);
});
