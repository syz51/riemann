import { expect, test } from "vite-plus/test";
import { CONTENTS, href, READING_ORDER, routeOf, STEPS } from "./pages";

test("the address of each page leads back to its route", () => {
  for (const page of READING_ORDER) expect(routeOf(href(page.route))).toBe(page.route);
});

test("an empty or unknown address is the contents page", () => {
  for (const hash of ["", "#", "#/", "#/no-such-page"]) expect(routeOf(hash)).toBe(CONTENTS);
});

test("the background of a step comes before the step, and no route repeats", () => {
  const routes = READING_ORDER.map((page) => page.route);
  expect(new Set(routes).size).toBe(routes.length);
  for (const step of STEPS) {
    for (const page of step.background) {
      expect(routes.indexOf(page.route)).toBeLessThan(routes.indexOf(step.route));
    }
  }
});
