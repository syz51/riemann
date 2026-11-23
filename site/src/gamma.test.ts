import { expect, test } from "vite-plus/test";
import { gamma } from "./gamma";

test("Γ(n + 1) is the product of the whole numbers up to n", () => {
  let product = 1;
  for (let n = 0; n <= 10; n++) {
    if (n > 0) product *= n;
    expect(gamma(n + 1)! / product).toBeCloseTo(1, 10);
  }
});

test("Γ(1/2) is the square root of π, and Γ(3/2) is half of it", () => {
  expect(gamma(0.5)).toBeCloseTo(Math.sqrt(Math.PI), 10);
  expect(gamma(1.5)).toBeCloseTo(Math.sqrt(Math.PI) / 2, 10);
});

test("Γ(x + 1) is x times Γ(x), also below 0", () => {
  for (const x of [-3.5, -2.25, -0.5, 0.25, 1.75, 4.2]) {
    expect(gamma(x + 1)! / (x * gamma(x)!)).toBeCloseTo(1, 9);
  }
});

test("Γ has no value at 0 and at the negative whole numbers", () => {
  for (const x of [0, -1, -2, -3, -4]) expect(gamma(x)).toBeUndefined();
});

test("x times Γ(x) is close to 1 near 0", () => {
  expect(0.001 * gamma(0.001)!).toBeCloseTo(1, 2);
  expect(-0.001 * gamma(-0.001)!).toBeCloseTo(1, 2);
});
