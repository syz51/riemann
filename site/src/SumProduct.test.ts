import { expect, test } from "vite-plus/test";
import { limit, series } from "./SumProduct";

test("the sum of 1/n² approaches π²/6", () => {
  expect(limit(2)).toBeCloseTo(Math.PI ** 2 / 6, 9);
});

test("the sum of 1/n has no value", () => {
  expect(limit(1)).toBeUndefined();
});

test("the sum and the product over the primes start as they must", () => {
  const { sums, products } = series(2);
  expect(sums[3]).toBeCloseTo(1 + 1 / 4 + 1 / 9, 12);
  // Primes up to 3: 1/(1 - 1/4) times 1/(1 - 1/9).
  expect(products[3]).toBeCloseTo((4 / 3) * (9 / 8), 12);
  // 4 is not a prime, so the product does not change.
  expect(products[4]).toBe(products[3]);
});

test("the product over the primes up to 100 is close to the whole sum", () => {
  const { products } = series(2);
  expect(Math.abs(products[100]! - limit(2)!)).toBeLessThan(0.01);
});
