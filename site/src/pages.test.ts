import { expect, test } from "vite-plus/test";
import {
  ALL_PAGE_ROUTES,
  backgroundKicker,
  BACKGROUNDS,
  CATALOG,
  childrenOf,
  CONTENTS,
  href,
  isBackgroundSection,
  isProofSection,
  parentLinkOf,
  routeOf,
  STEPS,
} from "./pages";

test("the address of each page leads back to its route", () => {
  for (const route of ALL_PAGE_ROUTES) expect(routeOf(href(route))).toBe(route);
});

test("an empty or unknown address is the proof home page", () => {
  for (const hash of ["", "#", "#/", "#/no-such-page"]) expect(routeOf(hash)).toBe(CONTENTS);
});

test("no page route repeats across steps, catalog and backgrounds", () => {
  expect(new Set(ALL_PAGE_ROUTES).size).toBe(ALL_PAGE_ROUTES.length);
});

test("proof and background sections partition all routes cleanly", () => {
  expect(isProofSection(CONTENTS)).toBe(true);
  expect(isBackgroundSection(CONTENTS)).toBe(false);
  for (const step of STEPS) {
    expect(isProofSection(step.route)).toBe(true);
    expect(isBackgroundSection(step.route)).toBe(false);
  }
  expect(isBackgroundSection(CATALOG)).toBe(true);
  expect(isProofSection(CATALOG)).toBe(false);
  for (const page of BACKGROUNDS) {
    expect(isBackgroundSection(page.route)).toBe(true);
    expect(isProofSection(page.route)).toBe(false);
  }
});

test("every background page has a parent link and provenance kicker", () => {
  for (const page of BACKGROUNDS) {
    expect(parentLinkOf(page.route)).toBeDefined();
    expect(backgroundKicker(page.route)).toBe(`Background · ${page.originLabel}`);
  }
  expect(parentLinkOf("gamma")?.route).toBe("zeta");
  expect(childrenOf("zeta").map((child) => child.route)).toEqual(["gamma"]);
});
