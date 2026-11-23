import { expect, test } from "vite-plus/test";
import { equationToHtml, proseToHtml } from "./prose";

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
