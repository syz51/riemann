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
  parseHash,
  routeOf,
  sectionOf,
  STEPS,
} from "./pages";

test("the address of each page leads back to its route", () => {
  for (const route of ALL_PAGE_ROUTES) expect(routeOf(href(route))).toBe(route);
});

test("section anchors round-trip cleanly alongside hash routes", () => {
  const url = href("zeta", "euler-1749");
  expect(url).toBe("#/zeta#euler-1749");
  expect(parseHash(url)).toEqual({ route: "zeta", section: "euler-1749" });
  expect(routeOf(url)).toBe("zeta");
  expect(sectionOf(url)).toBe("euler-1749");
  expect(sectionOf(href("zeta"))).toBeUndefined();
  expect(parseHash("#/zeta#")).toEqual({ route: "zeta" });
  expect(parseHash("#/missing#proof-route-heading")).toEqual({ route: CONTENTS });
});

const ROUTE_FILES: Partial<Record<string, string[]>> = {
  "complex-numbers": ["./ComplexPage.tsx", "./zh/ComplexPageZh.tsx"],
  zeta: ["./ZetaPage.tsx", "./zh/ZetaPageZh.tsx"],
  gamma: ["./GammaPage.tsx", "./zh/GammaPageZh.tsx"],
};

const SOURCE_FILES = import.meta.glob<string>(["./**/*.{ts,tsx}", "!./**/*.test.ts"], {
  query: "?raw",
  import: "default",
  eager: true,
});

test("every section anchor referenced in href() or step background links exists in both EN and ZH target pages", () => {
  const refs: { from: string; route: string; section: string }[] = [];
  for (const [file, text] of Object.entries(SOURCE_FILES)) {
    for (const m of text.matchAll(/\bhref\(\s*["']([^"']+)["']\s*,\s*["']([^"']+)["']\s*\)/g)) {
      refs.push({ from: file, route: m[1]!, section: m[2]! });
    }
    for (const m of text.matchAll(
      /\broute:\s*["']([^"']+)["']\s*,\s*section:\s*["']([^"']+)["']/g,
    )) {
      refs.push({ from: file, route: m[1]!, section: m[2]! });
    }
  }
  expect(refs.length).toBeGreaterThanOrEqual(4);
  for (const ref of refs) {
    const targetFiles = ROUTE_FILES[ref.route];
    expect(
      targetFiles,
      `No page files registered for route "${ref.route}" from ${ref.from}`,
    ).toBeDefined();
    for (const targetFile of targetFiles!) {
      const targetText = SOURCE_FILES[targetFile] ?? "";
      expect(
        targetText,
        `Missing id="${ref.section}" in ${targetFile} (linked from ${ref.from})`,
      ).toContain(`id="${ref.section}"`);
    }
  }
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
