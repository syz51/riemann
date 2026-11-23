import { expect, test } from "vite-plus/test";
import { equationToHtml, proseToHtml, replaceLiterals } from "./prose";

test("text without a formula is escaped and has no math element", () => {
  expect(proseToHtml("Cut & paste <b>")).toBe("Cut &amp; paste &lt;b&gt;");
});

test("a formula becomes an inline math element between the pieces of text", () => {
  const html = proseToHtml("The term is $1/n^2$ here.");
  expect(html.startsWith("The term is <math")).toBe(true);
  expect(html.endsWith("</math> here.")).toBe(true);
  expect(html).toContain("<msup>");
  expect(html).not.toContain('display="block"');
});

test("an unclosed formula stops the build", () => {
  expect(() => proseToHtml("The term is $1/n^2 here.")).toThrow("not closed");
});

test("a LaTeX error stops the build", () => {
  expect(() => proseToHtml("$\\frac{1}$")).toThrow();
});

test("a display equation is a block", () => {
  expect(equationToHtml("x = 1")).toContain('display="block"');
});

test("a backslash outside a formula stops the build", () => {
  expect(() => proseToHtml("one\\ntwo")).toThrow("backslash");
});

// The literals are built from pieces here: the plugin would replace a whole one in this file.
const TICK = "`";

test("the plugin replaces a tex literal by a display equation", () => {
  const out = replaceLiterals(`const a = tex${TICK}x^2${TICK};`);
  expect(out).toContain('display=\\"block\\"');
  expect(out).not.toContain("tex" + TICK);
});

test("the plugin replaces a prose literal by inline markup and keeps the line count", () => {
  const code = `const a = prose${TICK}One $x$\n  and two.${TICK};\nconst b = 1;`;
  const out = replaceLiterals(code);
  expect(out).toContain("One <math");
  expect(out).not.toContain("block");
  expect(out.split("\n").length).toBe(code.split("\n").length);
  expect(out.endsWith("const b = 1;")).toBe(true);
});
