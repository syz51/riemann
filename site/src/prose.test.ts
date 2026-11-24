import { expect, test } from "vite-plus/test";
import { equationToHtml, proseToHtml, replaceLiterals } from "./prose";

test("text without a formula is escaped and has no math element", () => {
  expect(proseToHtml("Cut & paste <b>")).toBe("Cut &amp; paste &lt;b&gt;");
});

test("a formula becomes inline KaTeX between the pieces of text", () => {
  const html = proseToHtml("The term is $1/n^2$ here.");
  expect(html.startsWith('The term is <span class="katex">')).toBe(true);
  expect(html.endsWith("</span> here.")).toBe(true);
  expect(html).toContain("<msup>");
  expect(html).not.toContain("katex-display");
});

test("a formula and the marks after it are in one span that does not break", () => {
  const html = proseToHtml("It is $x$, and ($y$). Then $z$ is next.");
  expect(html).toMatch(
    /^It is <span class="nowrap"><span class="katex">.*?<\/span>,<\/span> and <span class="nowrap">\(<span class="katex">/,
  );
  expect(html).toMatch(/<\/span>\)\.<\/span> Then <span class="katex">/);
  expect(html.endsWith("</span> is next.")).toBe(true);
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
