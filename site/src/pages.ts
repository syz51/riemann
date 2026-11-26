import { step1 } from "./steps/step1";

/** Proof walk-through step routes. */
export type StepRoute = "step-1";

/** Standalone background explainer routes. */
export type BackgroundRoute = "complex-numbers" | "zeta" | "gamma";

/** The Background catalog route. */
export const CATALOG = "background";

/** The Proof home page has the empty route. */
export const CONTENTS = "";

/** Any non-home page route. */
export type PageRoute = StepRoute | BackgroundRoute | typeof CATALOG;

/** Any route in the application. */
export type Route = PageRoute | typeof CONTENTS;

/** One published step of the proof walk-through. */
export type StepEntry = {
  route: StepRoute;
  number: number;
  level: string;
  title: string;
  summary: Markup;
};

/** One planned step shown along the proof spine on the home page. */
export type UpcomingStep = {
  number: number;
  level: string;
  status: "Next in walk-through" | "Planned";
  title: Markup;
  summary: Markup;
};

/** One background explainer page, linked to where it branches from in the proof. */
export type BackgroundEntry = {
  route: BackgroundRoute;
  title: string;
  summary: Markup;
  /** The step or earlier background page where this concept branches off. */
  from: StepRoute | BackgroundRoute;
  /** Short provenance label for the Background catalog and article kicker. */
  originLabel: string;
};

export type Link = { route: Route; label: string };

// The one list of published proof steps. A new step needs its route in
// StepRoute, an entry here, and a <Match> in App.tsx.
export const STEPS: StepEntry[] = [
  {
    route: "step-1",
    number: step1.number,
    level: "Level 0",
    title: step1.title,
    summary: step1.summary,
  },
];

// Planned top-level steps following lsernau/grh-lean (commit 72fead10, grh/GUIDE.md).
export const UPCOMING_STEPS: UpcomingStep[] = [
  {
    number: 2,
    level: "Level 1",
    status: "Next in walk-through",
    title: prose`New.grh and Dirichlet $L$-functions`,
    summary: prose`The proof does not treat $\zeta$ alone: New.grh proves non-vanishing in $\operatorname{Re}(s) > \frac{1}{2}$ for every Dirichlet $L$-function.`,
  },
  {
    number: 3,
    level: "Level 2",
    status: "Planned",
    title: prose`The mirror argument (New.zeta_zeros_on_line)`,
    summary: prose`Why having no zeros with real part above $\frac{1}{2}$ forces every non-trivial zero onto the critical line.`,
  },
  {
    number: 4,
    level: "Level 3",
    status: "Planned",
    title: prose`Three main theorems and star_inequality`,
    summary: prose`Short forms, enough forms, and long integral forms: how MainInequality and OneSidedBound yield New.grh.`,
  },
];

// The one list of background pages, each tied to where the proof first needs it.
export const BACKGROUNDS: BackgroundEntry[] = [
  {
    route: "complex-numbers",
    title: "Why complex numbers exist",
    summary: prose`Nobody wanted them. A correct formula for ordinary answers passed through the square roots of negative numbers.`,
    from: "step-1",
    originLabel: "From Step 1",
  },
  {
    route: "zeta",
    title: "Where the zeta function came from",
    summary: prose`It began as one sum that nobody could finish. Euler finished it and found that the answer knows about the primes.`,
    from: "step-1",
    originLabel: "From Step 1",
  },
  {
    route: "gamma",
    title: "The Gamma function",
    summary: prose`The symmetry of the zeta function uses $\Gamma$. It fills the gaps of the list 1, 2, 6, 24, 120, and Euler found it in 1729.`,
    from: "zeta",
    originLabel: "From the zeta function",
  },
];

/** The number of steps in the top-level walk-through, written or not. */
export const STEP_COUNT = step1.of;

/** All non-home routes recognized by the router. */
export const ALL_PAGE_ROUTES: PageRoute[] = [
  ...STEPS.map((step) => step.route),
  CATALOG,
  ...BACKGROUNDS.map((page) => page.route),
];

export const href = (route: Route) => `#/${route}`;

/** The route in the address, or the proof home page when no page has it. */
export const routeOf = (hash: string): Route => {
  const route = hash.replace(/^#\/?/, "");
  return ALL_PAGE_ROUTES.find((candidate) => candidate === route) ?? CONTENTS;
};

export const isStepRoute = (route: Route): route is StepRoute =>
  STEPS.some((step) => step.route === route);

export const isBackgroundRoute = (route: Route): route is BackgroundRoute =>
  BACKGROUNDS.some((page) => page.route === route);

export const isProofSection = (route: Route): boolean => route === CONTENTS || isStepRoute(route);

export const isBackgroundSection = (route: Route): boolean =>
  route === CATALOG || isBackgroundRoute(route);

export const backgroundOf = (route: BackgroundRoute): BackgroundEntry | undefined =>
  BACKGROUNDS.find((page) => page.route === route);

/** Direct child background pages that branch off a given page. */
export const childrenOf = (route: StepRoute | BackgroundRoute): BackgroundEntry[] =>
  BACKGROUNDS.filter((page) => page.from === route);

/** The direct parent link (step or earlier background page) of a background page. */
export const parentLinkOf = (route: BackgroundRoute): Link | undefined => {
  const entry = backgroundOf(route);
  if (!entry) return undefined;
  const step = STEPS.find((s) => s.route === entry.from);
  if (step) return { route: step.route, label: `Step ${step.number}: ${step.title}` };
  const bg = BACKGROUNDS.find((b) => b.route === entry.from);
  if (bg) return { route: bg.route, label: bg.title };
  return undefined;
};

/** Kicker line shown above a background article title, derived from pages.ts. */
export const backgroundKicker = (route: BackgroundRoute): string => {
  const origin = backgroundOf(route)?.originLabel;
  return origin ? `Background · ${origin}` : "Background";
};
