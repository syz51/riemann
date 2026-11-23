import { expect, test } from "vite-plus/test";
import { trimMargin } from "./rootGap";

test("a gap becomes a negative margin in em", () => {
  expect(trimMargin(7.1, 17)).toBe("-0.418em");
});

test("no gap, or a rounding difference, changes nothing", () => {
  expect(trimMargin(0, 17)).toBeUndefined();
  expect(trimMargin(0.3, 17)).toBeUndefined();
  expect(trimMargin(-2, 17)).toBeUndefined();
});

test("an unknown font size changes nothing", () => {
  expect(trimMargin(5, Number.NaN)).toBeUndefined();
});
